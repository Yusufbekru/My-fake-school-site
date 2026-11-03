'use strict';
(() => {
  const $ = s => document.querySelector(s);
  const region = $('.mfHwq');
  const originals = [...document.querySelectorAll('[data-test-id^="lesson-container-"]')];
  if (!region || originals.length < 4) return;
  const templates = originals.slice(0, 4).map(n => n.cloneNode(true));
  const list = originals[0].parentElement;
  list.replaceChildren();
  const now = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Tashkent'}));
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  const end = new Date(start); end.setFullYear(end.getFullYear() + 1); end.setDate(end.getDate() - 1);
  let selected = new Date(start);
  const key = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const controls = document.createElement('div');
  controls.className = 'date-controls';
  controls.innerHTML = '<label>Выбрать дату <input type="date" aria-label="Дата расписания"></label><button type="button">Сегодня</button>';
  $('.YFgHr').after(controls);
  const input = controls.querySelector('input');
  input.min = key(start); input.max = key(end);
  const prev = $('.jyOdp'), next = $('.ltz6T');
  for (const [el, name, delta] of [[prev,'Предыдущий день',-1],[next,'Следующий день',1]]) {
    el.setAttribute('role','button'); el.tabIndex = 0; el.setAttribute('aria-label', name);
    const move = () => { const d = new Date(selected); d.setDate(d.getDate()+delta); if(d >= start && d <= end) {selected=d;render();} };
    el.addEventListener('click', move);
    el.addEventListener('keydown', e => {if(e.key==='Enter'||e.key===' '){e.preventDefault();move();}});
  }
  function render() {
    input.value = key(selected);
    $('.UuDtC').textContent = selected.toLocaleDateString('ru-RU',{day:'numeric',month:'short',weekday:'long'});
    list.replaceChildren();
    if (selected.getDay() === 0) {
      const empty = document.createElement('div'); empty.className = 'wrlYl';
      empty.textContent = 'Воскресенье — уроков нет'; list.append(empty);
    } else templates.forEach(t => list.append(t.cloneNode(true)));
    const status = $('.xWioW');
    if(status) status.textContent = selected.getDay() === 0 ? 'Сегодня нет уроков.' : '4 урока · 8:00–11:15';
    prev.setAttribute('aria-disabled', String(+selected === +start));
    next.setAttribute('aria-disabled', String(+selected === +end));
  }
  input.addEventListener('change', () => {const d = new Date(input.value+'T12:00:00');if(d>=start&&d<=end){selected=d;render();}});
  controls.querySelector('button').onclick = () => {selected = new Date(start);render();};
  const badge = document.createElement('div'); badge.className = 'demo-notice';
  badge.textContent = 'Демонстрационная копия · локальное расписание'; document.body.prepend(badge);
  document.addEventListener('click', e => {
    const a = e.target.closest('a'); if(!a) return;
    e.preventDefault();
    if(/Дневник|Расписание|Домашние задания/.test(a.textContent)) region.scrollIntoView({behavior:'smooth',block:'start'});
  });
  render();
})();
