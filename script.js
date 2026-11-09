const serviceName = "혼자 떠나는 일본 여행 회화";
let isSubscribed = false;
let submitCount = 0;

function makeSubscribeMessage(email, subscribed) {
    if (subscribed === true) {
        return email + "로 신청이 완료되었습니다.";
    }

    return "이메일을 입력한 뒤 신청해주세요.";
}

const subscribeForm = document.querySelector("#subscribeForm");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

console.log(subscribeForm);
console.log(emailInput);
console.log(subscribeButton);
console.log(makeSubscribeMessage);

function handleSubscribe(event) {
    event.preventDefault();

    const subscriberEmail = emailInput.value.trim();

    if (subscriberEmail === "") {
        subscribeMessage.textContent =
            "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }

    isSubscribed = true;
    submitCount += 1;

    subscribeMessage.textContent =
        makeSubscribeMessage(subscriberEmail, isSubscribed);

    subscribeMessage.classList.add("is-success");

    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const userNameInput = document.querySelector("#userName");
const userNameCount = document.querySelector("#userNameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");
    themeButton.textContent = isDark ? "밝은 테마로 바꾸기" : "어두운 테마로 바꾸기";
}
themeButton.addEventListener("click", handleThemeClick);

function handleUserNameInput() {
    userNameCount.textContent = userNameInput.value.length + " / 10";
}
userNameInput.addEventListener("input", handleUserNameInput);

function handleAgreeChange() {
    const agreed = agreeCheck.checked;
    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed
        ? "확인이 완료되었습니다. 여행 회화 준비를 시작할 수 있습니다."
        : "안내 확인 후 여행 회화 준비를 시작할 수 있습니다.";
    agreeMessage.classList.toggle("is-ready", agreed);
    if (!agreed) {
        travelFlow.hidden = true;
    }
}
agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-pressed", "false");
    });
    panels.forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab) {
    const targetPanel = document.querySelector(clickedTab.dataset.target);
    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-pressed", "true");
    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) {
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}
tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabClick);
});

const travelFlow = document.querySelector("#travelFlow");
const travelSteps = document.querySelectorAll(".travel-step");
const travelProgress = document.querySelector("#travelProgress");
const travelName = document.querySelector("#travelName");
const travelDate = document.querySelector("#travelDate");
const travelSituation = document.querySelector("#travelSituation");
const travelError = document.querySelector("#travelError");
const situationHelp = document.querySelector("#situationHelp");
const travelSummary = document.querySelector("#travelSummary");
const travelResult = document.querySelector("#travelResult");
const travelPhrase = document.querySelector("#travelPhrase");
const travelReading = document.querySelector("#travelReading");
const stepNames = ["여행 정보 입력", "회화 상황 선택", "내용 확인"];
let currentTravelStep = 1;
let travelStarted = false;

const situationData = {
    food: { name: "음식점", help: "음식점에서 혼자 왔다고 말하는 표현을 준비합니다.", phrase: "一人です。", reading: "혼자 왔어요. · 히토리데스" },
    transport: { name: "교통", help: "이동할 때 역의 위치를 묻는 표현을 준비합니다.", phrase: "駅はどこですか。", reading: "역은 어디인가요? · 에키와 도코데스카" },
    hotel: { name: "숙소", help: "숙소에서 예약했다고 말하는 표현을 준비합니다.", phrase: "予約しています。", reading: "예약했습니다. · 요야쿠시테이마스" }
};

function showTravelStep(step) {
    currentTravelStep = step;
    travelSteps.forEach(function (item) {
        item.hidden = Number(item.dataset.step) !== step;
        if (!item.hidden) {
            item.querySelector("h3").focus();
        }
    });
    travelProgress.textContent = step <= 3 ? step + " / 3 · " + stepNames[step - 1] : "여행 회화 준비 완료";
}

startButton.addEventListener("click", function () {
    if (!agreeCheck.checked) return;
    travelFlow.hidden = false;
    if (!travelStarted) {
        travelName.value = userNameInput.value.trim();
        travelStarted = true;
    }
    showTravelStep(currentTravelStep);
    if (currentTravelStep === 1) travelName.focus();
});

document.querySelector("#travelNext1").addEventListener("click", function () {
    const missingName = travelName.value.trim() === "";
    const missingDate = travelDate.value === "" || !travelDate.validity.valid;
    travelName.classList.toggle("has-error", missingName);
    travelDate.classList.toggle("has-error", missingDate);
    travelName.setAttribute("aria-invalid", String(missingName));
    travelDate.setAttribute("aria-invalid", String(missingDate));
    if (missingName || missingDate) {
        travelError.textContent = missingName ? "여행자 이름을 입력해주세요." : "출발 날짜를 올바르게 선택해주세요.";
        (missingName ? travelName : travelDate).focus();
        return;
    }
    travelError.textContent = "";
    showTravelStep(2);
});

travelSituation.addEventListener("change", function () {
    situationHelp.textContent = situationData[travelSituation.value].help;
});
document.querySelector("#travelBack2").addEventListener("click", function () {
    showTravelStep(1); 
});
document.querySelector("#travelNext2").addEventListener("click", function () {
    const selected = situationData[travelSituation.value];
    travelSummary.textContent = travelName.value.trim() + " 님 · 출발 " + travelDate.value + " · " + selected.name;
    showTravelStep(3);
});
document.querySelector("#travelBack3").addEventListener("click", function () {
    showTravelStep(2);
});
document.querySelector("#travelComplete").addEventListener("click", function () {
    const selected = situationData[travelSituation.value];
    travelResult.textContent = travelSummary.textContent + " 회화 준비가 완료되었습니다. 아래 표현을 읽어보세요.";
    travelPhrase.textContent = selected.phrase;
    travelReading.textContent = selected.reading;
    showTravelStep(4);
});

document.querySelector("#travelRestart").addEventListener("click", function () {
    travelName.value = "";
    travelDate.value = "";
    travelSituation.value = "food";
    situationHelp.textContent = situationData.food.help;
    travelError.textContent = "";
    travelSummary.textContent = "";
    travelResult.textContent = "";
    travelPhrase.textContent = "";
    travelReading.textContent = "";
    travelName.classList.remove("has-error");
    travelDate.classList.remove("has-error");
    travelName.removeAttribute("aria-invalid");
    travelDate.removeAttribute("aria-invalid");
    userNameInput.value = "";
    handleUserNameInput();
    agreeCheck.checked = false;
    handleAgreeChange();
    travelStarted = false;
    showTravelStep(1);
    travelFlow.hidden = true;
    userNameInput.focus();
});

const practiceFlow = document.querySelector("#practiceFlow");
const practiceProgress = document.querySelector("#practiceProgress");
const practiceAnswer = document.querySelector("#practiceAnswer");
const practiceFeedback = document.querySelector("#practiceFeedback");
const practiceData = {
    food: [
        ["혼자 왔어요.", "一人です。", "히토리데스"],
        ["이걸 주세요.", "これをください。", "코레오 쿠다사이"],
        ["계산 부탁합니다.", "お会計をお願いします。", "오카이케에오 오네가이시마스"]
    ],
    transport: [
        ["역은 어디인가요?", "駅はどこですか。", "에키와 도코데스카"],
        ["몇 번 승강장인가요?", "何番ホームですか。", "난반 호오무데스카"],
        ["여기까지 가 주세요.", "ここまでお願いします。", "코코마데 오네가이시마스"]
    ],
    hotel: [
        ["예약했습니다.", "予約しています。", "요야쿠시테이마스"],
        ["체크인 부탁합니다.", "チェックインをお願いします。", "쳇쿠인오 오네가이시마스"],
        ["짐을 맡겨도 되나요?", "荷物を預けてもいいですか。", "니모츠오 아즈케테모 이이데스카"]
    ]
};
let practiceQueue = [];
let rememberedCount = 0;
let retryCount = 0;
let practiceRevealed = false;
let practiceActive = false;

function showPracticeCard() {
    practiceRevealed = false;
    practiceAnswer.hidden = true;
    document.querySelector("#practiceReveal").hidden = false;
    practiceProgress.textContent = "기억한 표현 " + rememberedCount + " / 3 · 남은 표현 " + practiceQueue.length;
    const finished = practiceQueue.length === 0;
    document.querySelector("#practiceCard").hidden = finished;
    document.querySelector("#practiceFinished").hidden = !finished;
    if (finished) {
        practiceActive = false;
        document.querySelector("#practiceResult").textContent = "3개 표현을 모두 기억했다고 표시했습니다. 다시 연습한 횟수: " + retryCount + "회. 자기 평가 결과입니다.";
        document.querySelector("#practiceAgain").focus();
        return;
    }
    document.querySelector("#practiceQuestion").textContent = practiceQueue[0][0];
    document.querySelector("#practiceJapanese").textContent = practiceQueue[0][1];
    document.querySelector("#practiceReading").textContent = practiceQueue[0][2];
    document.querySelector("#practiceReveal").focus();
}

function startPractice() {
    if (currentTravelStep !== 4 || !agreeCheck.checked) return;
    practiceQueue = practiceData[travelSituation.value].slice();
    rememberedCount = 0;
    retryCount = 0;
    practiceActive = true;
    practiceFlow.hidden = false;
    travelFlow.hidden = true;
    document.querySelector("#practiceContext").textContent = travelName.value.trim() + " 님 · " + travelDate.value + " · " + situationData[travelSituation.value].name;
    practiceFeedback.textContent = "뜻을 보고 먼저 소리 내어 말해보세요.";
    showPracticeCard();
}
document.querySelector("#practiceStart").addEventListener("click", startPractice);
document.querySelector("#practiceAgain").addEventListener("click", startPractice);

document.querySelector("#practiceReveal").addEventListener("click", function () {
    if (!practiceActive) return;
    practiceRevealed = true;
    practiceAnswer.hidden = false;
    this.hidden = true;
    practiceFeedback.textContent = "정답과 비교하고 선택해주세요.";
    document.querySelector("#practiceRemember").focus();
});
document.querySelector("#practiceRemember").addEventListener("click", function () {
    if (!practiceActive || !practiceRevealed) return;
    practiceQueue.shift();
    rememberedCount += 1;
    practiceFeedback.textContent = "모든 학습을 끝마쳤습니다.";
    showPracticeCard();
});
document.querySelector("#practiceRetry").addEventListener("click", function () {
    if (!practiceActive || !practiceRevealed) return;
    retryCount += 1;
    practiceFeedback.textContent = "같은 표현을 다시 연습합니다.";
    showPracticeCard();
});
function clearPractice() {
    practiceQueue = [];
    rememberedCount = 0;
    retryCount = 0;
    practiceActive = false;
    practiceRevealed = false;
    practiceFlow.hidden = true;
    practiceAnswer.hidden = true;
    practiceFeedback.textContent = "";
}
document.querySelector("#practiceBack").addEventListener("click", function () {
    clearPractice();
    travelFlow.hidden = false;
    showTravelStep(4); 
});
document.querySelector("#travelRestart").addEventListener("click", clearPractice);
agreeCheck.addEventListener("change", function () {
    if (!agreeCheck.checked) clearPractice();
});

// 9주차 과제: 일본 여행 회화 맞춤 학습 신청 폼
const requestForm = document.querySelector("#requestForm");
const requestName = document.querySelector("#requestName");
const requestDeparture = document.querySelector("#requestDeparture");
const requestRegion = document.querySelector("#requestRegion");
const requestSituationRadios = [...document.querySelectorAll('input[name="requestSituation"]')];
const requestExtraCheck = document.querySelector("#requestExtraCheck");
const requestExtraArea = document.querySelector("#requestExtraArea");
const requestExtraText = document.querySelector("#requestExtraText");
const requestSubmit = document.querySelector("#requestSubmit");
const requestReset = document.querySelector("#requestReset");
const requestStatus = document.querySelector("#requestStatus");
let requestSubmitting = false;
let requestAttempted = false;

function requestToday() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
}
requestDeparture.min = requestToday();

function showRequestFeedback(element, message, state) {
    const feedbackId = element === requestExtraText ? "requestExtraFeedback" : element.id + "Feedback";
    const feedback = document.getElementById(feedbackId);
    feedback.textContent = message;
    feedback.classList.toggle("is-error", state === "error");
    feedback.classList.toggle("is-valid", state === "valid");
    element.classList.toggle("has-error", state === "error");
    element.setAttribute("aria-invalid", String(state === "error"));
}

function checkRequestName(showError) {
    const length = requestName.value.trim().length;
    const valid = length >= 2 && length <= 10;
    const message = valid ? length + " / 10글자 · 입력 조건 충족" : length + " / 10글자 · 이름을 2~10글자로 입력해주세요.";
    showRequestFeedback(requestName, message, valid ? "valid" : showError ? "error" : "neutral");
    return valid;
}
function checkRequestDeparture(showError) {
    const value = requestDeparture.value;
    const valid = Boolean(value) && requestDeparture.validity.valid && value >= requestToday();
    showRequestFeedback(requestDeparture, valid ? "출발 날짜가 확인되었습니다." : "오늘 이후의 출발 날짜를 선택해주세요.", valid ? "valid" : showError ? "error" : "neutral");
    return valid;
}
function checkRequestRegion(showError) {
    const valid = requestRegion.value !== "";
    showRequestFeedback(requestRegion, valid ? "여행 지역을 선택했습니다." : "여행 지역을 선택해주세요.", valid ? "valid" : showError ? "error" : "neutral");
    return valid;
}
function checkRequestSituation(showError) {
    const valid = requestSituationRadios.some(radio => radio.checked);
    const feedback = document.querySelector("#requestSituationFeedback");
    feedback.textContent = valid ? "회화 상황을 선택했습니다." : "음식점, 교통, 숙소 중 하나를 선택해주세요.";
    feedback.classList.toggle("is-error", !valid && showError);
    feedback.classList.toggle("is-valid", valid);
    requestSituationRadios.forEach(radio => radio.setAttribute("aria-invalid", String(!valid && showError)));
    return valid;
}
function checkRequestExtra(showError) {
    if (!requestExtraCheck.checked) return true;
    const length = requestExtraText.value.trim().length;
    const valid = length >= 10 && length <= 200;
    showRequestFeedback(requestExtraText, valid ? length + " / 200글자 · 입력 조건 충족" : length + " / 200글자 · 10글자 이상 작성해주세요.", valid ? "valid" : showError ? "error" : "neutral");
    return valid;
}
function updateRequestExtra() {
    const active = requestExtraCheck.checked;
    requestExtraArea.hidden = !active;
    requestExtraText.disabled = !active;
    requestExtraCheck.setAttribute("aria-expanded", String(active));
    if (!active) {
        requestExtraText.value = "";
        showRequestFeedback(requestExtraText, "0 / 200글자 · 10글자 이상 필요", "neutral");
    } else {
        checkRequestExtra(requestAttempted);
    }
}
function validateRequest(showError) {
    // 단락 평가를 위해 모두 검사하며, 첫 번째 오류 항목을 반환합니다.
    const checks = [
        [requestName, checkRequestName(showError)],
        [requestDeparture, checkRequestDeparture(showError)],
        [requestRegion, checkRequestRegion(showError)],
        [requestSituationRadios[0], checkRequestSituation(showError)],
        [requestExtraText, checkRequestExtra(showError)]
    ];
    return checks.find(item => !item[1]);
}
function updateRequestOnEdit() {
    validateRequest(requestAttempted);
    if (requestStatus.classList.contains("is-error") || requestStatus.classList.contains("is-success")) {
        requestStatus.textContent = "입력 내용이 변경되었습니다. 내용을 확인하고 저장해주세요.";
        requestStatus.className = "";
    }
}
[requestName, requestDeparture, requestRegion, requestExtraText].forEach(input => {
    input.addEventListener("input", updateRequestOnEdit);
    input.addEventListener("change", updateRequestOnEdit);
});
requestSituationRadios.forEach(radio => radio.addEventListener("change", updateRequestOnEdit));
requestExtraCheck.addEventListener("change", () => {
    updateRequestExtra();
    updateRequestOnEdit();
});

requestForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (requestSubmitting) return;
    requestAttempted = true;
    requestDeparture.min = requestToday();
    const invalidItem = validateRequest(true);
    if (invalidItem) {
        requestStatus.textContent = "저장하지 못했습니다. 표시된 오류 항목을 수정해주세요.";
        requestStatus.className = "is-error";
        invalidItem[0].focus();
        return;
    }
    requestSubmitting = true;
    requestForm.setAttribute("aria-busy", "true");
    requestSubmit.disabled = true;
    requestReset.disabled = true;
    requestSubmit.textContent = "저장 중...";
    requestStatus.textContent = "학습 계획을 저장하고 있습니다...";
    requestStatus.className = "";
    // 9주차 교안 15쪽: name을 가진 활성화된 입력값만 FormData로 수집
    const formValues = new FormData(requestForm);
    const data = {
        name: String(formValues.get("travelerName") || "").trim(),
        departure: String(formValues.get("departure") || ""),
        region: String(formValues.get("region") || ""),
        situation: String(formValues.get("requestSituation") || ""),
        extra: String(formValues.get("extraText") || "").trim(),
        savedAt: new Date().toISOString()
    };
    try {
        // 저장 실패 시 입력값을 남기고 재시도할 수 있도록 예외 처리합니다.
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.setItem("japanTravelLearningRequest", JSON.stringify(data));
        requestStatus.textContent = "저장 완료! " + data.name + " 님의 " + data.region + " 여행 회화 학습 계획이 이 브라우저에 저장되었습니다.";
        requestStatus.className = "is-success";
    } catch (error) {
        requestStatus.textContent = "브라우저 저장에 실패했습니다. 저장 공간 또는 브라우저 설정을 확인한 뒤 다시 시도해주세요. 입력 내용은 그대로 유지됩니다.";
        requestStatus.className = "is-error";
    } finally {
        requestSubmitting = false;
        requestForm.setAttribute("aria-busy", "false");
        requestReset.disabled = false;
        requestSubmit.disabled = false;
        requestSubmit.textContent = "학습 계획 저장하기";
    }
});

requestReset.addEventListener("click", function () {
    if (requestSubmitting) return;
    requestForm.reset();
    requestAttempted = false;
    requestForm.setAttribute("aria-busy", "false");
    requestSituationRadios.forEach(radio => radio.removeAttribute("aria-invalid"));
    requestDeparture.min = requestToday();
    updateRequestExtra();
    [requestName, requestDeparture, requestRegion, requestExtraText].forEach(input => {
        input.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
    });
    ["requestNameFeedback", "requestDepartureFeedback", "requestRegionFeedback", "requestSituationFeedback", "requestExtraFeedback"].forEach(id => {
        const feedback = document.getElementById(id);
        feedback.classList.remove("is-error", "is-valid");
        feedback.textContent = "";
    });
    document.querySelector("#requestNameFeedback").textContent = "0 / 10글자 · 2글자 이상 필요";
    document.querySelector("#requestExtraFeedback").textContent = "0 / 200글자 · 10글자 이상 필요";
    requestStatus.textContent = "입력이 초기화되었습니다. 다시 작성할 수 있습니다.";
    requestStatus.className = "";
    requestSubmit.disabled = false;
    requestSubmit.textContent = "학습 계획 저장하기";
    requestName.focus();
});
