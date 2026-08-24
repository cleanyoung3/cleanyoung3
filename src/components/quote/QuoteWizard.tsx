"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import {
  SERVICE_OPTIONS,
  SERVICE_DETAIL_CONFIG,
  SERVICE_LABEL,
  type ServiceKey,
} from "@/lib/quote-config";
import { submitQuoteRequest } from "@/app/quote/actions";

type DetailAnswer = { type?: string; count?: string };

type Answers = {
  services: ServiceKey[];
  region: string;
  regionDetail: string;
  additionalServices: ServiceKey[];
  details: Record<string, DetailAnswer>;
  scheduleDate: string;
  scheduleNegotiate: boolean;
  name: string;
  phone: string;
  agree: boolean;
};

const initialAnswers: Answers = {
  services: [],
  region: "",
  regionDetail: "",
  additionalServices: [],
  details: {},
  scheduleDate: "",
  scheduleNegotiate: false,
  name: "",
  phone: "",
  agree: false,
};

type Step =
  | { type: "services" }
  | { type: "region" }
  | { type: "detail"; service: ServiceKey }
  | { type: "additional" }
  | { type: "schedule" }
  | { type: "contact" };

const ORDER = SERVICE_OPTIONS.map((s) => s.key);

export function QuoteWizard() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const steps = useMemo<Step[]>(() => {
    const list: Step[] = [{ type: "services" }, { type: "region" }];
    for (const key of ORDER) {
      if (answers.services.includes(key)) list.push({ type: "detail", service: key });
    }
    list.push({ type: "additional" });
    for (const key of ORDER) {
      if (answers.additionalServices.includes(key) && !answers.services.includes(key)) {
        list.push({ type: "detail", service: key });
      }
    }
    list.push({ type: "schedule" });
    list.push({ type: "contact" });
    return list;
  }, [answers.services, answers.additionalServices]);

  const step = steps[stepIndex];
  const canGoBack = stepIndex > 0;

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function toggleService(list: ServiceKey[], key: ServiceKey): ServiceKey[] {
    return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
  }

  async function handleSubmit() {
    if (!answers.name || !answers.phone || !answers.agree) {
      setError("이름, 연락처를 입력하고 개인정보 활용에 동의해주세요.");
      return;
    }
    setSubmitting(true);
    setError("");
    const allServices = Array.from(new Set([...answers.services, ...answers.additionalServices]));
    const res = await submitQuoteRequest({
      services: allServices,
      region: answers.region,
      regionDetail: answers.regionDetail,
      details: answers.details,
      preferredDate: answers.scheduleNegotiate ? "날짜 협의" : answers.scheduleDate,
      name: answers.name,
      phone: answers.phone,
    });
    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || "제출 중 오류가 발생했습니다.");
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
        <Image src="/images/mascot-thumbsup.png" alt="" width={160} height={160} className="h-32 w-auto object-contain" />
        <h2 className="mt-6 font-display text-[28.8px] font-bold text-ink">감사합니다.</h2>
        <p className="mt-2 text-[16.8px] text-ink-soft">
          빠른시일 내 고객님께 연락드리겠습니다!
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-14 md:py-20">
      {canGoBack && (
        <button
          type="button"
          onClick={goBack}
          className="mb-4 flex items-center gap-1 text-[16.8px] text-ink-soft hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" /> 이전
        </button>
      )}

      {step.type === "services" && (
        <StepServices
          title="어떤 서비스가 필요하신가요?"
          selected={answers.services}
          onToggle={(key) =>
            setAnswers((a) => ({ ...a, services: toggleService(a.services, key) }))
          }
          onNext={goNext}
          canProceed={answers.services.length > 0}
        />
      )}

      {step.type === "region" && (
        <StepRegion
          answers={answers}
          setAnswers={setAnswers}
          onNext={goNext}
        />
      )}

      {step.type === "detail" && (
        <StepDetail
          service={step.service}
          value={answers.details[step.service] ?? {}}
          onChange={(val) =>
            setAnswers((a) => ({
              ...a,
              details: { ...a.details, [step.service]: val },
            }))
          }
          onNext={goNext}
        />
      )}

      {step.type === "additional" && (
        <StepAdditional
          alreadySelected={answers.services}
          selected={answers.additionalServices}
          onToggle={(key) =>
            setAnswers((a) => ({
              ...a,
              additionalServices: toggleService(a.additionalServices, key),
            }))
          }
          onNext={goNext}
        />
      )}

      {step.type === "schedule" && (
        <StepSchedule answers={answers} setAnswers={setAnswers} onNext={goNext} />
      )}

      {step.type === "contact" && (
        <StepContact
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmit}
          submitting={submitting}
          error={error}
        />
      )}

      <p className="mt-8 text-center text-[14.4px] text-ink-soft">
        {stepIndex + 1} / {steps.length}
      </p>
    </div>
  );
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-[16.8px] font-semibold transition-colors ${
        selected
          ? "border-secondary bg-secondary/5 text-secondary-dark"
          : "border-black/10 text-ink hover:border-secondary/40"
      }`}
    >
      {label}
      <span
        className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
          selected ? "border-secondary bg-secondary text-white" : "border-black/20"
        }`}
      >
        {selected && "✓"}
      </span>
    </button>
  );
}

function NextButton({ onClick, disabled, label = "다음" }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-6 w-full rounded-lg bg-primary py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function StepServices({
  title,
  selected,
  onToggle,
  onNext,
  canProceed,
}: {
  title: string;
  selected: ServiceKey[];
  onToggle: (key: ServiceKey) => void;
  onNext: () => void;
  canProceed: boolean;
}) {
  return (
    <div>
      <h2 className="text-center font-display text-[24px] font-bold text-ink md:text-[28.8px]">{title}</h2>
      <p className="mt-1 text-center text-[14.4px] text-ink-soft">오래걸리지 않습니다. 아시는 만큼 기입해주세요.</p>
      <div className="mt-6 space-y-3">
        {SERVICE_OPTIONS.map((s) => (
          <OptionCard key={s.key} label={s.label} selected={selected.includes(s.key)} onClick={() => onToggle(s.key)} />
        ))}
      </div>
      <NextButton onClick={onNext} disabled={!canProceed} />
    </div>
  );
}

function StepAdditional({
  alreadySelected,
  selected,
  onToggle,
  onNext,
}: {
  alreadySelected: ServiceKey[];
  selected: ServiceKey[];
  onToggle: (key: ServiceKey) => void;
  onNext: () => void;
}) {
  const remaining = SERVICE_OPTIONS.filter((s) => !alreadySelected.includes(s.key));
  return (
    <div>
      <h2 className="text-center font-display text-[24px] font-bold text-ink md:text-[28.8px]">
        추가로 필요한 서비스가 있으실까요?
      </h2>
      <p className="mt-1 text-center text-[14.4px] text-ink-soft">그 외 청소청년의 서비스가 필요한 부분을 클릭해주세요.</p>
      <div className="mt-6 space-y-3">
        {remaining.map((s) => (
          <OptionCard key={s.key} label={s.label} selected={selected.includes(s.key)} onClick={() => onToggle(s.key)} />
        ))}
        {remaining.length === 0 && (
          <p className="rounded-2xl border border-black/10 px-5 py-4 text-center text-[16.8px] text-ink-soft">
            모든 서비스를 이미 선택하셨습니다.
          </p>
        )}
      </div>
      <NextButton onClick={onNext} label={selected.length > 0 ? "다음" : "없음, 다음으로"} />
    </div>
  );
}

function StepRegion({
  answers,
  setAnswers,
  onNext,
}: {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onNext: () => void;
}) {
  const canProceed = answers.region && (answers.region !== "경기도" || answers.regionDetail.trim().length > 0);
  return (
    <div>
      <h2 className="text-center font-display text-[24px] font-bold text-ink md:text-[28.8px]">
        거주하고 계신 지역이 어디신가요?
      </h2>
      <div className="mt-6 space-y-3">
        {["서울", "경기도", "그외지역"].map((r) => (
          <OptionCard
            key={r}
            label={r}
            selected={answers.region === r}
            onClick={() => setAnswers((a) => ({ ...a, region: r, regionDetail: r === "경기도" ? a.regionDetail : "" }))}
          />
        ))}
      </div>
      {answers.region === "경기도" && (
        <div className="mt-4">
          <p className="mb-2 text-[16.8px] font-semibold text-ink">거주중인 경기도 지역을 구체적으로 알려주세요</p>
          <input
            className="input"
            placeholder="예: 안양시 동안구"
            value={answers.regionDetail}
            onChange={(e) => setAnswers((a) => ({ ...a, regionDetail: e.target.value }))}
          />
        </div>
      )}
      <NextButton onClick={onNext} disabled={!canProceed} />
    </div>
  );
}

function StepDetail({
  service,
  value,
  onChange,
  onNext,
}: {
  service: ServiceKey;
  value: DetailAnswer;
  onChange: (val: DetailAnswer) => void;
  onNext: () => void;
}) {
  const config = SERVICE_DETAIL_CONFIG[service];
  const needsCount = !!config.countOptions;
  const canProceed = !!value.type && (!needsCount || !!value.count);

  return (
    <div>
      <p className="mb-1 text-center text-[14.4px] font-semibold text-secondary-dark">
        {SERVICE_LABEL[service]}
      </p>
      <h2 className="text-center font-display text-[21.6px] font-bold text-ink md:text-[24px]">
        {config.typeLabel}
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {config.typeOptions.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange({ ...value, type: opt })}
            className={`rounded-xl border-2 px-3 py-3 text-[14.4px] font-semibold transition-colors ${
              value.type === opt
                ? "border-secondary bg-secondary/5 text-secondary-dark"
                : "border-black/10 text-ink hover:border-secondary/40"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {needsCount && (
        <>
          <h2 className="mt-8 text-center font-display text-[21.6px] font-bold text-ink md:text-[24px]">
            {config.countLabel}
          </h2>
          <div className="mt-5 grid grid-cols-4 gap-2.5">
            {config.countOptions!.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ ...value, count: opt })}
                className={`rounded-xl border-2 py-3 text-[14.4px] font-semibold transition-colors ${
                  value.count === opt
                    ? "border-secondary bg-secondary/5 text-secondary-dark"
                    : "border-black/10 text-ink hover:border-secondary/40"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      <NextButton onClick={onNext} disabled={!canProceed} />
    </div>
  );
}

function StepSchedule({
  answers,
  setAnswers,
  onNext,
}: {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onNext: () => void;
}) {
  const canProceed = answers.scheduleNegotiate || answers.scheduleDate.length > 0;
  return (
    <div>
      <h2 className="text-center font-display text-[24px] font-bold text-ink md:text-[28.8px]">
        서비스를 받길 원하시는 일정을 선택해 주세요
      </h2>
      <p className="mt-1 text-center text-[14.4px] text-ink-soft">최소 3일 정도 여유를 두고 일정을 입력해주세요.</p>

      <div className="mt-6">
        <input
          type="date"
          disabled={answers.scheduleNegotiate}
          value={answers.scheduleDate}
          onChange={(e) => setAnswers((a) => ({ ...a, scheduleDate: e.target.value }))}
          className="input disabled:opacity-50"
        />
      </div>
      <label className="mt-4 flex items-center gap-2 text-[16.8px] text-ink-soft">
        <input
          type="checkbox"
          checked={answers.scheduleNegotiate}
          onChange={(e) =>
            setAnswers((a) => ({ ...a, scheduleNegotiate: e.target.checked, scheduleDate: "" }))
          }
          className="h-4 w-4 accent-primary"
        />
        날짜 협의
      </label>

      <NextButton onClick={onNext} disabled={!canProceed} />
    </div>
  );
}

function StepContact({
  answers,
  setAnswers,
  onSubmit,
  submitting,
  error,
}: {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
}) {
  return (
    <div>
      <h2 className="text-center font-display text-[24px] font-bold text-ink md:text-[28.8px]">
        서비스를 받길 원하시는 분의 정보를 입력해 주세요
      </h2>
      <div className="mt-6 space-y-4">
        <input
          className="input"
          placeholder="이름"
          value={answers.name}
          onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
        />
        <input
          className="input"
          placeholder="연락처"
          value={answers.phone}
          onChange={(e) => setAnswers((a) => ({ ...a, phone: e.target.value }))}
        />
        <label className="flex items-center gap-2 text-[14.4px] text-ink-soft">
          <input
            type="checkbox"
            checked={answers.agree}
            onChange={(e) => setAnswers((a) => ({ ...a, agree: e.target.checked }))}
            className="h-4 w-4 accent-primary"
          />
          [필수] 개인정보 활용에 동의합니다
        </label>
      </div>

      {error && <p className="mt-3 text-[16.8px] text-red-500">{error}</p>}

      <NextButton onClick={onSubmit} disabled={submitting} label={submitting ? "전송 중..." : "견적요청 완료"} />
    </div>
  );
}
