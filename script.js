// Header and sliding bar code
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const logo = document.querySelector("#logo img");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    logo.classList.add("small-logo");
  } else {
    header.classList.remove("scrolled");
    logo.classList.remove("small-logo");
  }
});

let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const controls = document.querySelectorAll(".hero-controls .control");
let slideInterval;

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    controls[i].classList.remove("active");
  });
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  controls[currentSlide].classList.add("active");

  // Restart timer
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Initial run
showSlide(0);
slideInterval = setInterval(nextSlide, 5000);
// ===============================
// Symptom diagnosis using MedAlpaca
// ===============================

// Daily health tracking
function saveHealthData() {
  const pressure = document.getElementById("blood-pressure").value;
  const sugar = document.getElementById("blood-sugar").value;
  const weight = document.getElementById("weight").value;
  const date =
    document.getElementById("track-date").value ||
    new Date().toISOString().split("T")[0];

  if (!pressure && !sugar && !weight) {
    alert("يرجى إدخال بيانات واحدة على الأقل");
    return;
  }

  // Get old data from localStorage or create new array
  let healthData = JSON.parse(localStorage.getItem("healthData")) || [];

  // Add new data
  healthData.push({
    date: date,
    pressure: pressure,
    sugar: sugar,
    weight: weight,
  });

  // Save data to localStorage
  localStorage.setItem("healthData", JSON.stringify(healthData));

  // Update data display
  displayHealthData();

  // Reset form
  document.getElementById("blood-pressure").value = "";
  document.getElementById("blood-sugar").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("track-date").value = "";

  alert("تم حفظ البيانات بنجاح!");
}

function displayHealthData() {
  const container = document.getElementById("health-data-container");
  const healthData = JSON.parse(localStorage.getItem("healthData")) || [];

  if (healthData.length === 0) {
    container.innerHTML =
      '<p style="color: #6c757d;">لا توجد بيانات مسجلة بعد</p>';
    return;
  }

  // Display data in chronological order (newest to oldest)
  let html =
    '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>التاريخ</th><th>ضغط الدم</th><th>السكر</th><th>الوزن</th></tr></thead><tbody>';

  healthData.reverse().forEach((data) => {
    html += `<tr>
      <td>${data.date}</td>
      <td>${data.pressure || "-"}</td>
      <td>${data.sugar || "-"}</td>
      <td>${data.weight || "-"}</td>
    </tr>`;
  });

  html += "</tbody></table></div>";
  container.innerHTML = html;
}

// Interactive hearing test
function playSound(frequency) {
  // Create audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Set frequency
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  // Set volume
  gainNode.gain.value = 0.2;

  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Play and stop sound after 2 seconds
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 2);
}

function evaluateHearing() {
  const freq250 = document.getElementById("freq-250").checked;
  const freq1000 = document.getElementById("freq-1000").checked;
  const freq4000 = document.getElementById("freq-4000").checked;
  const freq8000 = document.getElementById("freq-8000").checked;

  let result = "";

  if (freq250 && freq1000 && freq4000 && freq8000) {
    result = "سمعك يبدو طبيعياً في جميع الترددات المختبرة.";
  } else if (!freq8000 && freq250 && freq1000 && freq4000) {
    result = "قد يكون هناك ضعف طفيف في السمع للترددات العالية جداً.";
  } else if (!freq4000 && !freq8000) {
    result = "قد يكون هناك ضعف في السمع للترددات المتوسطة والعالية.";
  } else if (!freq250 && !freq1000) {
    result = "قد يكون هناك ضعف في السمع للترددات المنخفضة والمتوسطة.";
  } else {
    result = "نمط السمع غير منتظم. يوصى بإجراء فحص سمعي متخصص.";
  }

  document.getElementById("hearing-assessment").textContent = result;
  document.getElementById("hearing-result").style.display = "block";
}

// // Psychological support and venting
// function provideSupport() {
//   const feelings = document.getElementById('feelings').value;

//   if (!feelings) {
//     alert('يرجى مشاركة مشاعرك أولاً');
//     return;
//   }

//   // Different support responses based on content (simple example)
//   let supportMessage = '';

//   if (feelings.includes('حزين') || feelings.includes('تعيس') ||
//       feelings.includes('اكتئاب')) {
//     supportMessage =
//         'أنا هنا من أجلك. مشاعرك مهمة ويشرفني أن تشاركني إياها. تذكر أن المشاعر الصعبة مؤقتة وستمر. حاول القيام بشيء تحبه أو التحدث مع شخص مقرب.';
//   } else if (
//       feelings.includes('قلق') || feelings.includes('خوف') ||
//       feelings.includes('توتر')) {
//     supportMessage =
//         'القلق طبيعي ويشعر به الجميع في بعض الأحيان. جرب تمارين التنفس: خذ شهيقاً عميقاً لمدة 4 ثوان، احبس نفسك لمدة 4 ثوان، ثم زفير لمدة 6 ثوان. كرر ذلك عدة مرات.';
//   } else if (
//       feelings.includes('فرح') || feelings.includes('سعيد') ||
//       feelings.includes('مبسوط')) {
//     supportMessage =
//         'أشعر بسعادتي وأنا أقرأ مشاعرك الإيجابية! استمتع بهذه اللحظة الجميلة وشارك سعادتك مع من حولك.';
//   } else {
//     supportMessage =
//         'شكراً لمشاركة مشاعرك معي. تذكر أنك لست وحدك، وهناك دائماً من يهتم لأمرك. إذا كنت بحاجة إلى دعم إضافي، فلا تتردد في التواصل مع متخصص.';
//   }

//   document.getElementById('support-message').textContent = supportMessage;
//   document.getElementById('support-response').style.display = 'block';
// }

// function showRelaxationExercises() {
//   alert('جاري تحميل تمارين الاسترخاء... (هذه وظيفة ستطور لاحقاً)');
// }

// function showBreathingExercises() {
//   alert('جاري تحميل تمارين التنفس... (هذه وظيفة ستطور لاحقاً)');
// }

// function showMeditation() {
//   alert('جاري تحميل جلسات التأمل... (هذه وظيفة ستطور لاحقاً)');
// }

// BMI (Body Mass Index) calculation
function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight-bmi").value);

  if (!height || !weight) {
    alert("يرجى إدخال الطول والوزن");
    return;
  }

  // Convert from cm to meter
  const heightInMeter = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeter * heightInMeter);
  const roundedBmi = bmi.toFixed(1);

  // Determine category
  let category = "";
  let advice = "";

  if (bmi < 18.5) {
    category = "نقص في الوزن";
    advice = "ننصحك بزيادة الوزن بشكل صحي من خلال تناول أطعمة مغذية ومتوازنة.";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "وزن طبيعي";
    advice =
      "حافظ على وزنك الصحي من خلال الاستمرار في نظام غذائي متوازن وممارسة النشاط البدني.";
  } else if (bmi >= 25 && bmi < 30) {
    category = "زيادة في الوزن";
    advice =
      "ننصحك بإنقاص الوزن تدريجياً من خلال اتباع نظام غذائي صحي وممارسة الرياضة.";
  } else {
    category = "سمنة";
    advice =
      "ننصحك باستشارة أخصائي تغذية لوضع خطة مناسبة لإنقاص الوزن بشكل صحي وآمن.";
  }

  // Show result
  document.getElementById(
    "bmi-value"
  ).textContent = `مؤشر كتلة الجسم (BMI) هو: ${roundedBmi}`;
  document.getElementById("bmi-category").textContent = `الفئة: ${category}`;
  document.getElementById("bmi-advice").textContent = advice;
  document.getElementById("bmi-result").style.display = "block";
}

// Load health data on page load

window.addEventListener("load", function () {
  displayHealthData();
});

function showRelaxationExercises() {
  document.getElementById("relaxation-exercise").style.display = "block";
  document.getElementById("breathing-exercise").style.display = "none";
  document.getElementById("meditation-exercise").style.display = "none";
}

function showBreathingExercises() {
  document.getElementById("breathing-exercise").style.display = "block";
  document.getElementById("relaxation-exercise").style.display = "none";
  document.getElementById("meditation-exercise").style.display = "none";
}

function showMeditation() {
  document.getElementById("meditation-exercise").style.display = "block";
  document.getElementById("relaxation-exercise").style.display = "none";
  document.getElementById("breathing-exercise").style.display = "none";
}

// دائرة التنفس
let breathingInterval;
document.getElementById("start-breathing").addEventListener("click", () => {
  const circle = document.getElementById("breathing-circle");
  clearInterval(breathingInterval);
  let inhale = true;
  circle.style.width = "100px";
  circle.style.height = "100px";
  circle.textContent = "شهيق";
  breathingInterval = setInterval(() => {
    if (inhale) {
      circle.style.width = "200px";
      circle.style.height = "200px";
      circle.textContent = "زفير";
    } else {
      circle.style.width = "100px";
      circle.style.height = "100px";
      circle.textContent = "شهيق";
    }
    inhale = !inhale;
  }, 4000); // كل 4 ثواني
});

document.addEventListener("DOMContentLoaded", () => {
  const panic = document.getElementById("panicBtn");
  if (panic) {
    panic.addEventListener("click", () => {
      // عدل الرقم هنا لو عايز رقم آخر
      window.location.href = "tel:123";
    });
  }
});

(function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const byId = (id) => document.getElementById(id);
  const storeKey = "reminders.v1";

  const Storage = {
    load() {
      try {
        return JSON.parse(localStorage.getItem(storeKey) || "[]");
      } catch {
        return [];
      }
    },
    save(list) {
      localStorage.setItem(storeKey, JSON.stringify(list));
    },
  };

  const uid = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const fmtDateTime = (d) => {
    const dt = new Date(d);
    const date = dt.toLocaleDateString("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const time = dt.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} • ${time}`;
  };

  const daysNames = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const weeklyDaysEl = byId("weeklyDays");
  const selectedDays = new Set();
  function renderDays() {
    if (!weeklyDaysEl) return;
    weeklyDaysEl.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = daysNames[i];
      chip.dataset.day = i;
      chip.onclick = () => {
        if (selectedDays.has(i)) {
          selectedDays.delete(i);
          chip.classList.remove("active");
        } else {
          selectedDays.add(i);
          chip.classList.add("active");
        }
      };
      weeklyDaysEl.appendChild(chip);
    }
  }
  renderDays();

  let reminders = Storage.load();
  const timers = new Map();

  function parseTimeToDate(baseDate, timeStr) {
    const [h, m] = (timeStr || "00:00").split(":").map(Number);
    const d = new Date(baseDate);
    d.setHours(h, m || 0, 0, 0);
    return d;
  }

  function nextDaily(timeStr, startDate) {
    const now = new Date();
    const base = startDate ? new Date(startDate) : now;
    let target = parseTimeToDate(now, timeStr);
    if (target < now) target.setDate(target.getDate() + 1);
    if (startDate) {
      const earliest = parseTimeToDate(base, timeStr);
      if (target < earliest) {
        target = earliest;
        if (target < now) target.setDate(target.getDate() + 1);
      }
    }
    return target;
  }

  function nextWeekly(timeStr, days, startDate) {
    const now = new Date();
    const base = startDate ? new Date(startDate) : now;
    for (let add = 0; add < 14; add++) {
      const d = new Date(now);
      d.setDate(d.getDate() + add);
      if (!days.includes(d.getDay())) continue;
      const candidate = parseTimeToDate(d, timeStr);
      if (candidate < now) continue;
      if (startDate && candidate < parseTimeToDate(base, timeStr)) continue;
      return candidate;
    }
    const d = new Date(now);
    d.setDate(d.getDate() + 7);
    return parseTimeToDate(d, timeStr);
  }

  function nextEveryXHours(timeStr, xHours, startDate) {
    const now = new Date();
    const start = startDate
      ? parseTimeToDate(new Date(startDate), timeStr)
      : parseTimeToDate(now, timeStr);
    let t = new Date(start);
    while (t < now) t = new Date(t.getTime() + xHours * 60 * 60 * 1000);
    return t;
  }

  function computeNext(rem) {
    const { repeat, time, startDate, days, xHours } = rem;
    if (repeat === "daily") return nextDaily(time, startDate);
    if (repeat === "weekly") return nextWeekly(time, days || [], startDate);
    if (repeat === "everyXh")
      return nextEveryXHours(time, Number(xHours || 6), startDate);
    return null;
  }

  function requestPermission() {
    if (!("Notification" in window))
      return alert("هذا المتصفح لا يدعم الإشعارات.");
    if (Notification.permission === "denied")
      return alert("تم رفض الإذن مسبقاً من إعدادات المتصفح.");
    Notification.requestPermission().then((p) => {
      if (p === "granted")
        notify("تم تفعيل الإشعارات", "سأذكّرك في المواعيد المحددة ✅");
    });
  }
  const askPermBtn = byId("askPerm");
  if (askPermBtn) askPermBtn.onclick = requestPermission;

  function notify(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
      const n = new Notification(title, { body, icon: undefined });
      setTimeout(() => n.close(), 10000);
    } else {
      try {
        if (body) alert(title + "\n\n" + body);
        else alert(title);
      } catch (e) {}
    }
  }

  function clearTimer(id) {
    if (timers.has(id)) {
      clearTimeout(timers.get(id));
      timers.delete(id);
    }
  }

  function schedule(rem) {
    clearTimer(rem.id);
    if (rem.paused) return;
    const next = computeNext(rem);
    if (!next) return;
    rem.nextAt = next.getTime();
    Storage.save(reminders);
    const ms = next.getTime() - Date.now();
    const wait = Math.min(ms, 0x7fffffff);
    const to = setTimeout(() => {
      const title =
        rem.title + (rem.type === "med" && rem.dose ? ` — ${rem.dose}` : "");
      notify(
        title,
        `حان وقت التذكير • ${new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      );
      if (byId("soundOn") && byId("soundOn").checked) {
        try {
          byId("ding")
            .play()
            .catch(() => {});
        } catch (e) {}
      }
      rem.lastFiredAt = Date.now();
      const next2 = computeNext(rem);
      if (next2) {
        rem.nextAt = next2.getTime();
        Storage.save(reminders);
        schedule(rem);
      }
      renderList();
    }, wait);
    timers.set(rem.id, to);
  }

  function upsertReminder(data) {
    if (data.id) {
      const i = reminders.findIndex((r) => r.id === data.id);
      reminders[i] = { ...reminders[i], ...data };
    } else {
      data.id = uid();
      data.createdAt = Date.now();
      data.paused = false;
      data.lastFiredAt = null;
      data.nextAt = null;
      reminders.push(data);
    }
    Storage.save(reminders);
    schedule(reminders.find((r) => r.id === data.id));
    renderList();
  }

  function deleteReminder(id) {
    clearTimer(id);
    reminders = reminders.filter((r) => r.id !== id);
    Storage.save(reminders);
    renderList();
  }

  function togglePause(id, value) {
    const r = reminders.find((x) => x.id === id);
    if (!r) return;
    r.paused = value ?? !r.paused;
    Storage.save(reminders);
    schedule(r);
    renderList();
  }

  function markDone(id) {
    const r = reminders.find((x) => x.id === id);
    if (!r) return;
    r.lastDoneAt = Date.now();
    notify("تمّ تسجيل الإنجاز ✅", r.title);
    renderList();
  }

  const exportBtn = byId("exportBtn");
  if (exportBtn)
    exportBtn.onclick = () => {
      const blob = new Blob([JSON.stringify(reminders, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "reminders-export.json";
      a.click();
    };

  const importBtn = byId("importBtn");
  if (importBtn)
    importBtn.onclick = () => {
      const inp = document.createElement("input");
      inp.type = "file";
      inp.accept = "application/json";
      inp.onchange = () => {
        const file = inp.files[0];
        if (!file) return;
        const fr = new FileReader();
        fr.onload = () => {
          try {
            const data = JSON.parse(fr.result);
            if (!Array.isArray(data)) throw new Error();
            const map = new Map(reminders.map((r) => [r.id, r]));
            data.forEach((r) => {
              if (!r.id) r.id = uid();
              map.set(r.id, r);
            });
            reminders = Array.from(map.values());
            Storage.save(reminders);
            reminders.forEach(schedule);
            renderList();
          } catch {
            alert("ملف غير صالح");
          }
        };
        fr.readAsText(file);
      };
      inp.click();
    };

  function fillForm(rem) {
    byId("remId").value = rem?.id || "";
    byId("title").value = rem?.title || "";
    byId("type").value = rem?.type || "med";
    byId("dose").value = rem?.dose || "";
    byId("time").value = rem?.time || "";
    byId("startDate").value = rem?.startDate || "";
    byId("repeat").value = rem?.repeat || "daily";
    byId("xHours").value = rem?.xHours || 6;
    byId("perDay").value = rem?.perDay || "";
    byId("notes").value = rem?.notes || "";
    selectedDays.clear();
    $$("#weeklyDays .chip").forEach((ch) => ch.classList.remove("active"));
    if (rem?.days?.length) {
      rem.days.forEach((d) => {
        selectedDays.add(d);
        const btn = $(`#weeklyDays .chip[data-day="${d}"]`);
        if (btn) btn.classList.add("active");
      });
    }
    updateRepeatVisibility();
  }
  const resetFormBtn = byId("resetForm");
  if (resetFormBtn) resetFormBtn.onclick = () => fillForm(null);

  function updateRepeatVisibility() {
    const v = byId("repeat").value;
    if (weeklyDaysEl) weeklyDaysEl.hidden = v !== "weekly";
    const everyX = byId("everyX");
    if (everyX) everyX.hidden = v !== "everyXh";
  }
  const repeatSel = byId("repeat");
  if (repeatSel) repeatSel.addEventListener("change", updateRepeatVisibility);

  function renderList() {
    const list = byId("list");
    if (!list) return;
    list.innerHTML = "";
    if (!reminders.length) {
      byId("empty").hidden = false;
      return;
    }
    byId("empty").hidden = true;
    const sorted = reminders
      .slice()
      .sort((a, b) => (a.nextAt || Infinity) - (b.nextAt || Infinity));
    sorted.forEach((rem) => {
      const item = document.createElement("div");
      item.className = "item";
      const left = document.createElement("div");
      const right = document.createElement("div");
      right.className = "controls";

      const h3 = document.createElement("h3");
      h3.textContent =
        rem.title + (rem.type === "med" && rem.dose ? ` — ${rem.dose}` : "");
      left.appendChild(h3);

      const meta = document.createElement("div");
      meta.className = "meta";
      const nextTxt = rem.nextAt
        ? `الموعد التالي: ${fmtDateTime(rem.nextAt)}`
        : "— لم يحدد";
      meta.textContent = nextTxt;
      left.appendChild(meta);

      const badges = document.createElement("div");
      badges.className = "badges";
      badges.innerHTML = `
        <span class="badge">${
          rem.repeat === "daily"
            ? "يومي"
            : rem.repeat === "weekly"
            ? "أسبوعي"
            : `كل ${rem.xHours} س`
        }</span>
        ${
          rem.type === "med"
            ? '<span class="badge">دواء</span>'
            : '<span class="badge">عادة</span>'
        }
        ${
          rem.paused
            ? '<span class="badge" style="background:#3a1a1a;border-color:#7f1d1d">مُوقّف</span>'
            : ""
        }
        ${
          rem.lastDoneAt
            ? '<span class="badge">آخر تحديد: ' +
              new Date(rem.lastDoneAt).toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              }) +
              "</span>"
            : ""
        }
      `;
      left.appendChild(badges);

      const pauseLbl = document.createElement("label");
      pauseLbl.className = "row";
      pauseLbl.style.gap = "6px";
      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.className = "toggle";
      toggle.checked = !rem.paused;
      toggle.onchange = () => togglePause(rem.id, !rem.paused);
      pauseLbl.appendChild(toggle);
      pauseLbl.appendChild(document.createTextNode("مفعّل"));
      right.appendChild(pauseLbl);

      const btnDone = document.createElement("button");
      btnDone.className = "btn btn-ok";
      btnDone.textContent = "تمّ";
      btnDone.onclick = () => markDone(rem.id);
      right.appendChild(btnDone);

      const btnEdit = document.createElement("button");
      btnEdit.className = "btn";
      btnEdit.textContent = "تعديل";
      btnEdit.onclick = () => fillForm(rem);
      right.appendChild(btnEdit);

      const btnDel = document.createElement("button");
      btnDel.className = "btn btn-danger";
      btnDel.textContent = "حذف";
      btnDel.onclick = () => {
        if (confirm("هل تريد حذف هذا التذكير؟")) deleteReminder(rem.id);
      };
      right.appendChild(btnDel);

      item.appendChild(left);
      item.appendChild(right);
      list.appendChild(item);
    });
  }

  const form = byId("reminderForm");
  if (form)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = byId("remId").value || undefined;
      const data = {
        id,
        title: byId("title").value.trim(),
        type: byId("type").value,
        dose: byId("dose").value.trim(),
        time: byId("time").value,
        startDate: byId("startDate").value || null,
        repeat: byId("repeat").value,
        days: Array.from(selectedDays.values()).map(Number),
        xHours: Number(byId("xHours").value || 6),
        perDay: byId("perDay").value ? Number(byId("perDay").value) : null,
        notes: byId("notes").value.trim(),
      };
      if (!data.title) return alert("الرجاء كتابة العنوان.");
      if (!data.time) return alert("اختر وقت التذكير.");
      if (data.repeat === "weekly" && (!data.days || !data.days.length))
        return alert("اختر يومًا واحدًا على الأقل للأسبوعي.");
      if (data.repeat === "everyXh" && (!data.xHours || data.xHours < 1))
        return alert("أدخل عدد الساعات (>=1).");
      upsertReminder(data);
      fillForm(null);
    });

  function boot() {
    updateRepeatVisibility();
    reminders.forEach((r) => schedule(r));
    renderList();
  }
  boot();
})();

(function () {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");

  let current = 0;
  let score = 0;

  const quizData = [
    {
      q: "كم لتر ماء يُفضل شربهم يوميًا للحفاظ على الصحة؟",
      choices: ["1 لتر", "2 لتر", "5 لتر"],
      answer: "2 لتر",
    },
    {
      q: "ما هو المعدل الطبيعي لضغط الدم؟",
      choices: ["120/80", "160/100", "90/60"],
      answer: "120/80",
    },
    {
      q: "كم عدد ساعات النوم الموصى بها للبالغين؟",
      choices: ["4 ساعات", "7-8 ساعات", "10 ساعات"],
      answer: "7-8 ساعات",
    },
    {
      q: "أي نوع من الدهون صحي أكثر؟",
      choices: ["دهون مشبعة", "دهون غير مشبعة", "دهون صناعية (ترانس)"],
      answer: "دهون غير مشبعة",
    },
    {
      q: "ما هو الفيتامين الأساسي من الشمس؟",
      choices: ["فيتامين C", "فيتامين D", "فيتامين B12"],
      answer: "فيتامين D",
    },
    {
      q: "كم عدد الخطوات الموصى بها يوميًا للحفاظ على النشاط؟",
      choices: ["2000 خطوة", "5000 خطوة", "10000 خطوة"],
      answer: "10000 خطوة",
    },
    {
      q: "أي الأطعمة غني بالألياف؟",
      choices: ["الخضروات", "الحلويات", "اللحوم"],
      answer: "الخضروات",
    },
    {
      q: "ما هو أكبر عضو في جسم الإنسان؟",
      choices: ["القلب", "الكبد", "الجلد"],
      answer: "الجلد",
    },
    {
      q: "أي تمرين مفيد لصحة القلب؟",
      choices: ["اليوغا", "المشي السريع", "رفع الأثقال فقط"],
      answer: "المشي السريع",
    },
    {
      q: "مستوى السكر الطبيعي في الدم (صائم)؟",
      choices: ["70-100 mg/dl", "200 mg/dl", "50 mg/dl"],
      answer: "70-100 mg/dl",
    },
    {
      q: "أيها أفضل لتقليل التوتر؟",
      choices: ["التنفس العميق", "الأكل الزائد", "السهر"],
      answer: "التنفس العميق",
    },
    {
      q: "كم عدد وجبات الفاكهة الموصى بها يوميًا؟",
      choices: ["1", "2-3", "6"],
      answer: "2-3",
    },
    {
      q: "الإفراط في الملح يؤدي إلى؟",
      choices: ["ضغط دم مرتفع", "فقدان الوزن", "تحسين النوم"],
      answer: "ضغط دم مرتفع",
    },
    {
      q: "أين يُخزن الأنسولين في الجسم؟",
      choices: ["البنكرياس", "الكبد", "الكلى"],
      answer: "البنكرياس",
    },
    {
      q: "ما أفضل وقت لممارسة الرياضة؟",
      choices: ["بعد الأكل مباشرة", "عندما يناسب وقتك", "قبل النوم مباشرة"],
      answer: "عندما يناسب وقتك",
    },
    {
      q: "ما الفائدة الأساسية لشرب الماء؟",
      choices: ["ترطيب الجسم", "زيادة الوزن", "رفع الضغط"],
      answer: "ترطيب الجسم",
    },
    {
      q: "ما نوع الغذاء الذي يقوي المناعة؟",
      choices: ["الخضروات والفواكه", "المقليات", "المشروبات الغازية"],
      answer: "الخضروات والفواكه",
    },
    {
      q: "الإقلاع عن التدخين يقلل خطر؟",
      choices: ["السرطان وأمراض القلب", "زيادة الوزن", "الزكام فقط"],
      answer: "السرطان وأمراض القلب",
    },
    {
      q: "كم نسبة الجسم من الماء تقريبًا؟",
      choices: ["30%", "60%", "90%"],
      answer: "60%",
    },
    {
      q: "ما هي أداة الإسعاف الأولية لوقف نزيف؟",
      choices: ["قطن/شاش نظيف", "ماء فقط", "أي شيء معدني"],
      answer: "قطن/شاش نظيف",
    },
  ];

  function showQuestion() {
    const q = quizData[current];
    if (!q) return;
    questionEl.textContent = `س ${current + 1}: ${q.q}`;
    optionsEl.innerHTML = "";
    feedback.textContent = "";
    nextBtn.hidden = true;

    q.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.className = "optBtn";
      btn.onclick = () => checkAnswer(choice);
      optionsEl.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const q = quizData[current];
    if (selected === q.answer) {
      feedback.textContent = "✔️ أحسنت! الإجابة صحيحة.";
      feedback.className = "ok";
      score++;
    } else {
      feedback.textContent = "❌ الإجابة خاطئة. الصحيحة: " + q.answer;
      feedback.className = "wrong";
    }
    nextBtn.hidden = false;
  }

  nextBtn.addEventListener("click", () => {
    current++;
    if (current < quizData.length) showQuestion();
    else {
      questionEl.textContent = "🎉 انتهى الاختبار!";
      optionsEl.innerHTML = "";
      feedback.textContent = `نتيجتك: ${score} من ${quizData.length} سؤال.`;
      nextBtn.hidden = true;
    }
  });

  showQuestion();
})();

(function () {
  const stage = document.getElementById("stage");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const bestEl = document.getElementById("best");
  const avgEl = document.getElementById("avg");
  const countEl = document.getElementById("count");
  const historyEl = document.getElementById("history");

  let waitingTimer = null;
  let goTime = 0;
  let state = "idle";
  const LS_KEY = "reaction.times.v1";
  let times = (function () {
    try {
      const s = localStorage.getItem(LS_KEY);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  })();

  function rndDelay(min = 1200, max = 3000) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function setStage(newState, text) {
    stage.classList.remove("idle", "wait", "go");
    if (newState === "idle") {
      stage.classList.add("idle");
      stage.textContent = text || "اضغط ابدأ للبدء";
    }
    if (newState === "waiting") {
      stage.classList.add("wait");
      stage.textContent = text || "تحضير… انتظر اللون الأخضر";
    }
    if (newState === "go") {
      stage.classList.add("go");
      stage.textContent = text || "اضغط الآن!";
    }
    state = newState;
  }

  function recordTime(ms) {
    times.push(ms);
    saveTimes();
    renderStats();
  }

  function saveTimes() {
    localStorage.setItem(LS_KEY, JSON.stringify(times));
  }
  function resetAll() {
    times = [];
    saveTimes();
    renderStats();
    renderHistory();
    setStage("idle");
    clearPending();
  }

  function clearPending() {
    if (waitingTimer) {
      clearTimeout(waitingTimer);
      waitingTimer = null;
    }
    goTime = 0;
  }

  function renderStats() {
    if (times.length === 0) {
      bestEl.textContent = "—";
      avgEl.textContent = "—";
      countEl.textContent = "0";
      historyEl.innerHTML =
        '<div class="muted">لا توجد نتائج بعد — ابدأ الاختبار.</div>';
      return;
    }
    const best = Math.min(...times);
    const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    bestEl.textContent = best;
    avgEl.textContent = avg;
    countEl.textContent = times.length;
    renderHistory();
  }
  function renderHistory() {
    if (times.length === 0) {
      historyEl.innerHTML =
        '<div class="muted">لا توجد نتائج بعد — ابدأ الاختبار.</div>';
      return;
    }
    historyEl.innerHTML = times
      .slice()
      .reverse()
      .map((t) => `<div>🔸 ${t} ملّي ثانية</div>`)
      .join("");
  }

  function beginTest() {
    clearPending();
    setStage("waiting");
    waitingTimer = setTimeout(() => {
      setStage("go");
      goTime = performance.now();
      try {
        navigator.vibrate && navigator.vibrate(50);
      } catch (e) {}
    }, rndDelay(1200, 3000));
  }

  function respond() {
    if (state === "waiting") {
      clearPending();
      setStage("idle", "🔴 ضغطت مبكّر! حاول مرة أخرى.");
      try {
        navigator.vibrate && navigator.vibrate([60, 40, 60]);
      } catch (e) {}
      return;
    }
    if (state === "go") {
      const end = performance.now();
      const ms = Math.round(end - goTime);
      recordTime(ms);
      setStage("idle", `✅ زمن رد فعلك: ${ms} ملّي ثانية`);
      return;
    }
    if (state === "idle") {
      beginTest();
    }
  }

  if (startBtn) startBtn.addEventListener("click", beginTest);
  if (resetBtn)
    resetBtn.addEventListener("click", () => {
      if (confirm("هل متأكد أنك عايز تمسح كل النتائج؟")) resetAll();
    });

  if (stage) stage.addEventListener("click", respond);
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      respond();
    }
    if (e.key && e.key.toLowerCase() === "r") {
      if (confirm("مسح النتائج؟")) resetAll();
    }
  });

  renderStats();
  window.addEventListener("beforeunload", () => saveTimes());
})();
// تصفية حسب التصنيف
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.getAttribute("data-category");

    // إزالة النشاط من جميع الأزرار
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // إضافة النشاط للزر المختار
    this.classList.add("active");

    const tipCards = document.querySelectorAll(".tip-card");

    tipCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
// ================================
function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const arrow = element.querySelector(".arrow");

  answer.classList.toggle("show");
  arrow.classList.toggle("rotate");
}

// البحث عن الأسئلة
document.getElementById("searchInput").addEventListener("keyup", function () {
  const searchText = this.value.toLowerCase();
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item
      .querySelector(".faq-question span")
      .textContent.toLowerCase();
    const answer = item.querySelector(".faq-answer").textContent.toLowerCase();

    if (question.includes(searchText) || answer.includes(searchText)) {
      item.style.display = "block";
      // إبراز النص المطلوب
      if (searchText) {
        const regex = new RegExp(searchText, "gi");
        const questionElement = item.querySelector(".faq-question span");
        const answerElement = item.querySelector(".faq-answer");

        questionElement.innerHTML = questionElement.textContent.replace(
          regex,
          (match) => `<span class="highlight">${match}</span>`
        );
        answerElement.innerHTML = answerElement.textContent.replace(
          regex,
          (match) => `<span class="highlight">${match}</span>`
        );
      }
    } else {
      item.style.display = "none";
    }
  });
});

// تصفية حسب التصنيف
// تمت إزالة التكرار هنا لأن categoryButtons تم تعريفها بالفعل في الأعلى
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.getAttribute("data-category");

    // إزالة النشاط من جميع الأزرار
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // إضافة النشاط للزر المختار
    this.classList.add("active");

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      if (
        category === "all" ||
        item.getAttribute("data-category") === category
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
// العناصر الرئيسية في الصفحة
const video = document.getElementById("video");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const heartRateElement = document.getElementById("heartRate");
const confidenceElement = document.getElementById("confidence");
const timerElement = document.getElementById("timer");
const faceOverlay = document.querySelector(".face-overlay");

// متغيرات التتبع
let stream = null;
let detector = null;
let processingInterval = null;
let measurementStartTime = null;
let timerInterval = null;
let chart = null;
let signalData = [];
let timestamps = [];

// إعداد الرسم البياني
function setupChart() {
  const ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "إشارة النبض",
          borderColor: "#e74c3c",
          backgroundColor: "rgba(231, 76, 60, 0.1)",
          data: [],
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "شدة الإشارة",
          },
        },
        x: {
          title: {
            display: true,
            text: "الوقت (ثانية)",
          },
        },
      },
    },
  });
}

// بدء القياس
async function startMeasurement() {
  try {
    // طلب إذن استخدام الكاميرا
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });

    video.srcObject = stream;

    // تحميل نموذج كشف الوجه
    // في تطبيق حقيقي، نستخدم هنا مكتبة مثل face-api.js أو tensorflow.js

    // تهيئة واجهة المستخدم
    startButton.disabled = true;
    stopButton.disabled = false;
    measurementStartTime = Date.now();

    // بدء المؤقت
    let seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      timerElement.textContent = seconds;
    }, 1000);

    // بدء معالجة الإطارات
    processingInterval = setInterval(processVideoFrame, 100);

    // إعداد الرسم البياني
    if (!chart) {
      setupChart();
    } else {
      chart.data.labels = [];
      chart.data.datasets[0].data = [];
      chart.update();
    }

    signalData = [];
    timestamps = [];
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert(
      "تعذر الوصول إلى الكاميرا. يرجى التأكد من منح الإذن لاستخدام الكاميرا."
    );
  }
}

// محاكاة معالجة إطار الفيديو
function processVideoFrame() {
  // في التطبيق الحقيقي، نستخدم مكتبات رؤية حاسوبية
  // لكشف الوجه وتتبع التغيرات في لون البشرة

  // محاكاة كشف الوجه
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  // وضع مربع وهمي حول الوجه (في التطبيق الحقيقي سيتم اكتشافه)
  faceOverlay.style.display = "block";
  faceOverlay.style.width = "200px";
  faceOverlay.style.height = "200px";
  faceOverlay.style.left = (videoWidth - 200) / 2 + "px";
  faceOverlay.style.top = (videoHeight - 200) / 2 + "px";

  // محاكاة الحصول على إشارة النبض
  const currentTime = (Date.now() - measurementStartTime) / 1000;
  const simulatedSignal = Math.sin(currentTime * 2) + Math.random() * 0.2;

  // تخزين البيانات للرسم البياني
  signalData.push(simulatedSignal);
  timestamps.push(currentTime.toFixed(1));

  // تحديث الرسم البياني
  if (chart) {
    chart.data.labels = timestamps;
    chart.data.datasets[0].data = signalData;

    // تحديث جزء من البيانات فقط لتحسين الأداء
    if (timestamps.length % 5 === 0) {
      chart.update();
    }
  }

  // بعد 5 ثوانٍ، نبدأ بعرض نتائج محاكاة
  if (currentTime > 5) {
    // محاكاة حساب معدل النبض
    const simulatedHeartRate = 60 + Math.floor(Math.random() * 40);
    const simulatedConfidence = 80 + Math.floor(Math.random() * 20);

    heartRateElement.textContent = simulatedHeartRate;
    confidenceElement.textContent = simulatedConfidence;
  }
}

// إيقاف القياس
function stopMeasurement() {
  if (processingInterval) {
    clearInterval(processingInterval);
    processingInterval = null;
  }

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
    video.srcObject = null;
  }

  faceOverlay.style.display = "none";
  startButton.disabled = false;
  stopButton.disabled = true;
}

// إعداد معالجات الأحداث
startButton.addEventListener("click", startMeasurement);
stopButton.addEventListener("click", stopMeasurement);

// تهيئة الرسم البياني عند تحميل الصفحة
window.addEventListener("load", setupChart);
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // تبديل الفئات الرئيسية
  const categoryItems = document.querySelectorAll(".category-item");
  const cards = document.querySelectorAll(".card");

  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      // إزالة النشاط من جميع العناصر
      categoryItems.forEach((i) => i.classList.remove("active"));
      cards.forEach((c) => c.classList.remove("active"));

      // إضافة النشاط للعنصر المحدد
      this.classList.add("active");
      const category = this.getAttribute("data-category");
      document.getElementById(category).classList.add("active");
    });
  });

  // تبديل الفئات الفرعية
  const subCategories = document.querySelectorAll(".sub-category");
  const subContents = document.querySelectorAll(".sub-content");

  subCategories.forEach((item) => {
    item.addEventListener("click", function () {
      // إزالة النشاط من جميع العناصر
      subCategories.forEach((i) => i.classList.remove("active"));
      subContents.forEach((c) => c.classList.remove("active"));

      // إضافة النشاط للعنصر المحدد
      this.classList.add("active");
      const subCategory = this.getAttribute("data-sub");
      document.getElementById(subCategory).classList.add("active");
    });
  });
});

// وظيفة لإظهار المحتوى المخفي
function showContent(contentId) {
  const content = document.getElementById(contentId);
  content.classList.remove("hidden-content");

  // إخفاء الزر بعد النقر عليه
  const button = event.target.closest(".show-content-btn");
  if (button) {
    button.style.display = "none";
  }
}
function showContent(type) {
  // إخفاء جميع أقسام المحتوى
  document.querySelectorAll(".content-section").forEach((section) => {
    section.style.display = "none";
  });

  // إخفاء فئات الاختيار
  document.querySelector(".categories").style.display = "none";

  // إظهار القسم المحدد
  document.getElementById(`${type}-content`).style.display = "block";

  // التمرير إلى القسم المحدد
  document
    .getElementById(`${type}-content`)
    .scrollIntoView({ behavior: "smooth" });
}

function showCategories() {
  // إخفاء جميع أقسام المحتوى
  document.querySelectorAll(".content-section").forEach((section) => {
    section.style.display = "none";
  });

  // إظهار فئات الاختيار
  document.querySelector(".categories").style.display = "flex";

  // التمرير إلى الأعلى
  window.scrollTo({ top: 0, behavior: "smooth" });
}
