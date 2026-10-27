(function () {
  'use strict';

  /* ---------- справочники ---------- */
  var CATS = [
    'Кабель и провод',
    'Низковольтное оборудование',
    'Щиты и шкафы',
    'Светотехника',
    'Автоматизация и КИПиА',
    'Приводная техника',
    'Высоковольтное оборудование',
    'Электромонтажные изделия',
    'Учёт электроэнергии',
    'Кабеленесущие системы'
  ];

  var REGIONS = [
    'Москва', 'Московская обл.', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск',
    'Казань', 'Нижний Новгород', 'Краснодар', 'Самара', 'Ростов-на-Дону',
    'Челябинск', 'Пермь', 'Тюмень', 'Красноярск', 'Уфа', 'Воронеж'
  ];

  // [категория, заголовок, позиции[[название, кол-во]], регион, заказчик, бюджет, часов назад, дней до конца, предложений]
  var RAW = [
    [0, 'Кабель силовой для реконструкции цеха', [['ВВГнг(А)-LS 5×16', '1 200 м'], ['ВВГнг(А)-LS 3×2,5', '4 500 м'], ['ВВГнг(А)-LS 5×4', '900 м']], 'Екатеринбург', 'Производство', 1850000, 2, 6, 3],
    [2, 'Шкаф управления насосной станцией ШУН-2', [['Шкаф ШУН на 2 насоса 15 кВт', '2 шт'], ['Плавный пуск в комплекте', '2 шт']], 'Казань', 'ЖКХ', 640000, 5, 9, 1],
    [1, 'Автоматические выключатели и УЗО для ЖК', [['Автомат 1P C16 4,5 кА', '820 шт'], ['Автомат 1P C25 4,5 кА', '310 шт'], ['УЗО 2P 40А 30 мА', '260 шт'], ['Дифавтомат 1P+N C16', '140 шт']], 'Московская обл.', 'Строительство', 0, 7, 4, 6],
    [3, 'Светильники светодиодные для склада 6 000 м²', [['Светильник LED 150 Вт IP65 high-bay', '96 шт'], ['Светильник аварийный 3 ч', '24 шт']], 'Новосибирск', 'Торговля', 980000, 11, 12, 4],
    [4, 'Датчики давления и температуры для котельной', [['Датчик давления 4–20 мА, 0–1,6 МПа', '18 шт'], ['Термопреобразователь Pt100, L=120', '24 шт'], ['Модуль ввода AI 8 каналов', '4 шт']], 'Пермь', 'ЖКХ', 420000, 14, 3, 2],
    [5, 'Частотные преобразователи для вентиляции', [['ПЧ 7,5 кВт 380 В IP20', '6 шт'], ['ПЧ 11 кВт 380 В IP20', '4 шт'], ['Сетевой дроссель 25А', '10 шт']], 'Санкт-Петербург', 'Монтажная организация', 760000, 20, 7, 5],
    [6, 'Ячейки КСО-393 для РП 10 кВ', [['Ячейка КСО-393 с ВВ/TEL', '8 шт'], ['Трансформатор тока ТОЛ-10', '24 шт']], 'Тюмень', 'Производство', 9600000, 26, 18, 2],
    [7, 'Электромонтажные материалы на объект', [['Гофротруба ПВХ 20 мм', '3 000 м'], ['Коробка распаячная 100×100 IP55', '400 шт'], ['Клеммы Wago 221-413', '2 500 шт']], 'Краснодар', 'Монтажная организация', 0, 30, 2, 8],
    [8, 'Счётчики электроэнергии с удалённым опросом', [['Счётчик 3ф 5(100)А, PLC/RS-485', '140 шт'], ['УСПД', '3 шт']], 'Самара', 'ЖКХ', 1250000, 34, 10, 3],
    [9, 'Лотки перфорированные и крепёж', [['Лоток 200×50 перфорированный, 3 м', '600 шт'], ['Кронштейн настенный 200', '1 400 шт'], ['Шпилька М8, 2 м', '800 шт']], 'Челябинск', 'Строительство', 540000, 40, 5, 4],
    [0, 'Провод ПуГВ для сборки щитов', [['ПуГВ 1×1,5 чёрный', '10 бухт'], ['ПуГВ 1×2,5 синий', '8 бухт'], ['ПуГВ 1×6 ж/з', '4 бухты']], 'Москва', 'Производство', 85000, 46, 1, 7],
    [2, 'ВРУ и этажные щиты для жилого дома', [['ВРУ-1-11-10 УХЛ4', '2 шт'], ['ЩЭ на 4 квартиры', '36 шт'], ['ЩУРн-1/12', '18 шт']], 'Ростов-на-Дону', 'Строительство', 2300000, 50, 14, 2],
    [4, 'ПЛК и панель оператора для линии розлива', [['ПЛК, 32 DI / 24 DO, Ethernet', '1 шт'], ['Панель оператора 10"', '1 шт'], ['Модуль AI/AO', '2 шт']], 'Воронеж', 'Производство', 380000, 56, 8, 3],
    [3, 'Уличное освещение территории предприятия', [['Консольный светильник LED 100 Вт', '42 шт'], ['Опора 8 м с закладной', '42 шт'], ['Фотореле', '4 шт']], 'Уфа', 'Производство', 1450000, 60, 11, 1],
    [1, 'Контакторы и тепловые реле', [['Контактор 25А 220В AC', '60 шт'], ['Контактор 40А 220В AC', '20 шт'], ['Реле тепловое 17–25А', '60 шт']], 'Нижний Новгород', 'Монтажная организация', 210000, 70, 3, 5],
    [5, 'Электродвигатели АИР для замены', [['АИР 132M4 11 кВт 1500 об/мин', '3 шт'], ['АИР 160S4 15 кВт', '2 шт']], 'Красноярск', 'Производство', 0, 76, 6, 4],
    [0, 'Кабель контрольный и симметричный', [['КВВГнг(А)-LS 10×1,5', '2 000 м'], ['КВВГЭнг(А)-LS 4×1,5', '1 500 м'], ['Витая пара FTP cat5e', '3 000 м']], 'Санкт-Петербург', 'Монтажная организация', 690000, 84, 9, 2],
    [8, 'Трансформаторы тока для узлов учёта', [['ТТИ-А 300/5 0,5S', '45 шт'], ['ТТИ-60 600/5 0,5S', '15 шт'], ['Испытательная коробка ИКК', '20 шт']], 'Казань', 'ЖКХ', 160000, 90, 4, 3],
    [6, 'КТП 1000 кВА для промплощадки', [['КТП-1000/10/0,4 киоскового типа', '1 шт'], ['Трансформатор ТМГ-1000', '1 шт']], 'Екатеринбург', 'Производство', 7800000, 100, 21, 1],
    [7, 'Наконечники, гильзы, термоусадка', [['Наконечник ТМЛ 16-8', '1 000 шт'], ['Гильза ГМЛ 25', '400 шт'], ['Термоусадка 12/6 чёрная', '500 м']], 'Москва', 'Монтажная организация', 48000, 110, 2, 9],
    [9, 'Кабель-каналы для офисного центра', [['Кабель-канал 100×60 с перегородкой', '1 200 м'], ['Розеточный блок под К-К', '320 шт']], 'Москва', 'Строительство', 0, 120, 7, 3],
    [2, 'Шкафы автоматики для ИТП', [['Шкаф управления ИТП с ПЛК', '4 шт'], ['Шкаф учёта тепла', '4 шт']], 'Новосибирск', 'ЖКХ', 1680000, 130, 15, 0],
    [4, 'Расходомеры электромагнитные', [['Расходомер Ду50, RS-485', '6 шт'], ['Расходомер Ду100, RS-485', '2 шт']], 'Тюмень', 'Производство', 540000, 145, 5, 2],
    [3, 'Офисные светильники 600×600', [['Панель LED 36 Вт 4000К', '480 шт'], ['Блок аварийного питания', '60 шт']], 'Краснодар', 'Строительство', 620000, 160, 3, 6],
    [1, 'Модульное оборудование для щитов освещения', [['Автомат 3P C32', '40 шт'], ['Реле импульсное 16А', '60 шт'], ['Таймер DIN', '12 шт']], 'Самара', 'Монтажная организация', 120000, 175, 6, 4],
    [5, 'Устройства плавного пуска для насосов', [['УПП 22 кВт 380 В', '4 шт'], ['УПП 37 кВт 380 В', '2 шт']], 'Пермь', 'ЖКХ', 330000, 190, 4, 2],
    [0, 'Кабель с медной жилой — остатки по проекту', [['ВВГнг(А)-FRLS 3×1,5', '700 м'], ['ВВГнг(А)-FRLS 3×2,5', '450 м']], 'Воронеж', 'Строительство', 95000, 210, 0, 5],
    [8, 'Счётчики однофазные для СНТ', [['Счётчик 1ф 5(60)А на опору, с дисплеем', '220 шт']], 'Московская обл.', 'ЖКХ', 990000, 240, 0, 8],
    [6, 'Разъединители и ОПН для ВЛ 10 кВ', [['РЛНД-10/400', '6 шт'], ['ОПН-10 кВ', '18 шт']], 'Уфа', 'ЖКХ', 280000, 270, 0, 4],
    [7, 'Розетки и выключатели для гостиницы', [['Розетка 2К+З белая', '640 шт'], ['Выключатель 2-кл.', '380 шт'], ['Рамка 2-местная', '300 шт']], 'Санкт-Петербург', 'Строительство', 410000, 300, 0, 7],
    [4, 'Реле контроля и промежуточные реле', [['Реле контроля фаз', '30 шт'], ['Реле промежуточное 24 VDC 2CO с колодкой', '200 шт']], 'Челябинск', 'Производство', 0, 330, 0, 6],
    [9, 'Металлорукав и вводы', [['Металлорукав в ПВХ 20 мм', '1 000 м'], ['Кабельный ввод М25', '600 шт']], 'Нижний Новгород', 'Производство', 140000, 360, 0, 5]
  ];

  var NOW = Date.now();
  var H = 3600 * 1000;
  var ITEMS = RAW.map(function (r, i) {
    var pub = NOW - r[6] * H;
    var end = r[7] > 0 ? NOW + (r[7] * 24 - (i % 7) * 2) * H : NOW - (2 + i % 4) * 24 * H;
    return {
      id: 48210 - i * 37,
      cat: r[0], title: r[1], pos: r[2], region: r[3], cust: r[4], budget: r[5],
      pub: pub, end: end, offers: r[8], open: r[7] > 0
    };
  });

  /* ---------- утилиты ---------- */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function plural(n, a, b, c) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return a;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return b;
    return c;
  }
  function money(n) { return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₽'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ago(t) {
    var h = Math.round((NOW - t) / H);
    if (h < 1) return 'только что';
    if (h < 24) return h + ' ' + plural(h, 'час', 'часа', 'часов') + ' назад';
    var d = Math.floor(h / 24);
    if (d === 1) return 'вчера';
    return d + ' ' + plural(d, 'день', 'дня', 'дней') + ' назад';
  }
  function left(t) {
    var h = Math.round((t - NOW) / H);
    if (h < 24) return h + ' ' + plural(h, 'час', 'часа', 'часов');
    var d = Math.floor(h / 24);
    return d + ' ' + plural(d, 'день', 'дня', 'дней');
  }
  function fmtDate(t) { return new Date(t).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }); }
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { el.classList.remove('is-on'); }, 2600);
  }
  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { return null; }
  }

  /* ---------- тема ---------- */
  var root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    $$('[data-set-theme]').forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.setTheme === t)); });
    var meta = $('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = getComputedStyle(root).getPropertyValue('--header').trim();
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  $$('[data-set-theme]').forEach(function (b) {
    b.addEventListener('click', function () {
      applyTheme(b.dataset.setTheme);
      store('theme', b.dataset.setTheme);
    });
  });

  /* ---------- меню ---------- */
  var burger = $('.burger'), mob = $('#mobmenu');
  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    mob.hidden = !open;
  });
  $$('a', mob).forEach(function (a) { a.addEventListener('click', function () { burger.setAttribute('aria-expanded', 'false'); mob.hidden = true; }); });

  /* ---------- состояние фильтров ---------- */
  var PER = 8;
  var state = { q: '', cat: -1, status: 'open', region: '', cust: [], min: '', max: '', budget: false, days: 0, sort: 'new', page: 1 };
  var favs = {};
  try { favs = JSON.parse(store('favs') || '{}') || {}; } catch (e) { favs = {}; }

  // категории
  var catsEl = $('#cats');
  function catCount(i) { return ITEMS.filter(function (x) { return x.open && (i < 0 || x.cat === i); }).length; }
  catsEl.innerHTML = [-1].concat(CATS.map(function (_, i) { return i; })).map(function (i) {
    return '<button type="button" class="cat' + (i < 0 ? ' is-on' : '') + '" data-cat="' + i + '">' +
      (i < 0 ? 'Все категории' : esc(CATS[i])) + ' <i>' + catCount(i) + '</i></button>';
  }).join('');
  catsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.cat');
    if (!b) return;
    state.cat = +b.dataset.cat;
    update();
  });

  // регионы
  var regSel = $('#fRegion');
  REGIONS.slice().sort().forEach(function (r) { regSel.insertAdjacentHTML('beforeend', '<option>' + esc(r) + '</option>'); });
  $('#reqRegion').innerHTML = '<option value="">Выберите регион</option>' + REGIONS.slice().sort().map(function (r) { return '<option>' + esc(r) + '</option>'; }).join('');
  $('#reqCat').innerHTML = '<option value="">Выберите категорию</option>' + CATS.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('');

  $('#statActive').textContent = ITEMS.filter(function (x) { return x.open; }).length * 37 + ' ';

  // элементы управления
  $('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    state.q = $('#q').value.trim();
    update();
    $('#list').scrollIntoView({ behavior: 'smooth' });
  });
  var qTimer;
  $('#q').addEventListener('input', function () {
    clearTimeout(qTimer);
    qTimer = setTimeout(function () { state.q = $('#q').value.trim(); update(); }, 250);
  });
  $$('.hint [data-q]').forEach(function (b) {
    b.addEventListener('click', function () {
      $('#q').value = b.dataset.q;
      state.q = b.dataset.q;
      update();
      $('#list').scrollIntoView({ behavior: 'smooth' });
    });
  });
  $$('#fStatus button').forEach(function (b) {
    b.addEventListener('click', function () { state.status = b.dataset.v; update(); });
  });
  regSel.addEventListener('change', function () { state.region = regSel.value; update(); });
  $$('input[name="cust"]').forEach(function (c) {
    c.addEventListener('change', function () {
      state.cust = $$('input[name="cust"]:checked').map(function (x) { return x.value; });
      update();
    });
  });
  ['#fMin', '#fMax'].forEach(function (s) {
    $(s).addEventListener('input', function () { state.min = $('#fMin').value; state.max = $('#fMax').value; update(); });
  });
  $('#fBudget').addEventListener('change', function () { state.budget = this.checked; update(); });
  $('#fDate').addEventListener('change', function () { state.days = +this.value; update(); });
  $('#sort').addEventListener('change', function () { state.sort = this.value; update(true); });

  function reset() {
    state = { q: '', cat: -1, status: 'open', region: '', cust: [], min: '', max: '', budget: false, days: 0, sort: state.sort, page: 1 };
    $('#q').value = '';
    regSel.value = '';
    $$('input[name="cust"]').forEach(function (c) { c.checked = false; });
    $('#fMin').value = ''; $('#fMax').value = '';
    $('#fBudget').checked = false;
    $('#fDate').value = '0';
    update();
  }
  $('#fReset').addEventListener('click', reset);
  $('#emptyReset').addEventListener('click', reset);

  // выезжающая панель фильтров (планшет/мобильный)
  var filters = $('#filters'), backdrop = $('.filters__backdrop');
  function drawer(open) {
    filters.classList.toggle('is-open', open);
    backdrop.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  $('.filters__open').addEventListener('click', function () { drawer(true); });
  $('.filters__close').addEventListener('click', function () { drawer(false); });
  backdrop.addEventListener('click', function () { drawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') drawer(false); });

  /* ---------- фильтрация ---------- */
  function filtered() {
    var q = state.q.toLowerCase();
    var min = state.min === '' ? 0 : +state.min;
    var max = state.max === '' ? Infinity : +state.max;
    return ITEMS.filter(function (x) {
      if (state.status === 'open' && !x.open) return false;
      if (state.status === 'closed' && x.open) return false;
      if (state.cat >= 0 && x.cat !== state.cat) return false;
      if (state.region && x.region !== state.region) return false;
      if (state.cust.length && state.cust.indexOf(x.cust) < 0) return false;
      if (state.budget && !x.budget) return false;
      if ((state.min !== '' || state.max !== '') && (!x.budget || x.budget < min || x.budget > max)) return false;
      if (state.days && NOW - x.pub > state.days * 24 * H) return false;
      if (q) {
        var hay = (x.title + ' ' + CATS[x.cat] + ' ' + x.region + ' ' + x.pos.map(function (p) { return p[0]; }).join(' ')).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    }).sort(function (a, b) {
      switch (state.sort) {
        case 'deadline': return (b.open - a.open) || (a.open ? a.end - b.end : b.end - a.end);
        case 'budget': return b.budget - a.budget;
        case 'offers': return a.offers - b.offers;
        default: return b.pub - a.pub;
      }
    });
  }

  var ICON = {
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    org: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></svg>'
  };

  function card(x) {
    var total = x.end - x.pub;
    var pct = x.open ? Math.max(4, Math.min(100, Math.round((NOW - x.pub) / total * 100))) : 100;
    var soon = x.open && x.end - NOW < 48 * H;
    var isNew = NOW - x.pub < 24 * H;
    var shown = x.pos.slice(0, 3);
    var pos = shown.map(function (p) { return '<li><span>' + esc(p[0]) + '</span><span>' + esc(p[1]) + '</span></li>'; }).join('');
    if (x.pos.length > 3) pos += '<li class="more">+ ещё ' + (x.pos.length - 3) + ' ' + plural(x.pos.length - 3, 'позиция', 'позиции', 'позиций') + '</li>';
    var fav = !!favs[x.id];

    return '<li class="card' + (x.open ? '' : ' is-closed') + '">' +
      '<div class="card__body">' +
        '<div class="card__meta">' +
          (isNew ? '<span class="tag tag--new">новая</span>' : '') +
          (soon ? '<span class="tag tag--hot">срочно</span>' : '') +
          '<span class="tag">' + esc(CATS[x.cat]) + '</span>' +
          '<span>№ ' + x.id + '</span><span>· ' + ago(x.pub) + '</span>' +
        '</div>' +
        '<h3 class="card__title"><a href="#list" data-open="' + x.id + '">' + esc(x.title) + '</a></h3>' +
        '<ul class="card__pos">' + pos + '</ul>' +
        '<div class="card__info">' +
          '<span>' + ICON.pin + esc(x.region) + '</span>' +
          '<span>' + ICON.org + esc(x.cust) + '</span>' +
          '<span>' + ICON.clock + 'до ' + fmtDate(x.end) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="card__side">' +
        '<div class="card__budget' + (x.budget ? '' : ' is-none') + '"><small>Бюджет</small>' + (x.budget ? money(x.budget) : 'по запросу') + '</div>' +
        '<div class="deadline' + (soon ? ' is-soon' : '') + '">' +
          (x.open ? 'Осталось <b>' + left(x.end) + '</b>' : '<b>Приём завершён</b>') +
          '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
        '</div>' +
        '<div class="offers">Предложений: <b>' + x.offers + '</b></div>' +
        '<div class="card__actions">' +
          (x.open
            ? '<button type="button" class="btn btn--ink" data-offer="' + x.id + '">Предложить цену</button>'
            : '<button type="button" class="btn btn--line" data-similar="' + x.cat + '">Похожие</button>') +
          '<button type="button" class="fav" aria-pressed="' + fav + '" aria-label="В избранное" data-fav="' + x.id + '">' + ICON.star + '</button>' +
        '</div>' +
      '</div>' +
    '</li>';
  }

  function chips() {
    var c = [];
    if (state.q) c.push(['q', '«' + state.q + '»']);
    if (state.cat >= 0) c.push(['cat', CATS[state.cat]]);
    if (state.region) c.push(['region', state.region]);
    state.cust.forEach(function (v) { c.push(['cust:' + v, v]); });
    if (state.min !== '' || state.max !== '') c.push(['money', (state.min ? 'от ' + money(+state.min) + ' ' : '') + (state.max ? 'до ' + money(+state.max) : '')]);
    if (state.budget) c.push(['budget', 'С бюджетом']);
    if (state.days) c.push(['days', $('#fDate').selectedOptions[0].textContent]);
    return c;
  }

  $('#chips').addEventListener('click', function (e) {
    var b = e.target.closest('[data-chip]');
    if (!b) return;
    var k = b.dataset.chip;
    if (k === 'q') { state.q = ''; $('#q').value = ''; }
    else if (k === 'cat') state.cat = -1;
    else if (k === 'region') { state.region = ''; regSel.value = ''; }
    else if (k.indexOf('cust:') === 0) {
      var v = k.slice(5);
      state.cust = state.cust.filter(function (x) { return x !== v; });
      $$('input[name="cust"]').forEach(function (c) { if (c.value === v) c.checked = false; });
    }
    else if (k === 'money') { state.min = state.max = ''; $('#fMin').value = $('#fMax').value = ''; }
    else if (k === 'budget') { state.budget = false; $('#fBudget').checked = false; }
    else if (k === 'days') { state.days = 0; $('#fDate').value = '0'; }
    update();
  });

  $('#cards').addEventListener('click', function (e) {
    var f = e.target.closest('[data-fav]');
    if (f) {
      var id = f.dataset.fav;
      if (favs[id]) delete favs[id]; else favs[id] = 1;
      f.setAttribute('aria-pressed', String(!!favs[id]));
      store('favs', JSON.stringify(favs));
      toast(favs[id] ? 'Заявка добавлена в избранное' : 'Заявка убрана из избранного');
      return;
    }
    var o = e.target.closest('[data-offer], [data-open]');
    if (o) { e.preventDefault(); toast('Войдите как поставщик, чтобы отправить цену по заявке № ' + (o.dataset.offer || o.dataset.open)); return; }
    var s = e.target.closest('[data-similar]');
    if (s) { state.cat = +s.dataset.similar; state.status = 'open'; update(); }
  });

  function pager(pages) {
    var el = $('#pager');
    if (pages < 2) { el.innerHTML = ''; return; }
    var p = state.page, h = '';
    h += '<button type="button" data-p="' + (p - 1) + '"' + (p === 1 ? ' disabled' : '') + ' aria-label="Назад">←</button>';
    for (var i = 1; i <= pages; i++) h += '<button type="button" data-p="' + i + '"' + (i === p ? ' class="is-on" aria-current="page"' : '') + '>' + i + '</button>';
    h += '<button type="button" data-p="' + (p + 1) + '"' + (p === pages ? ' disabled' : '') + ' aria-label="Вперёд">→</button>';
    el.innerHTML = h;
  }
  $('#pager').addEventListener('click', function (e) {
    var b = e.target.closest('[data-p]');
    if (!b || b.disabled) return;
    state.page = +b.dataset.p;
    render();
    $('#list').scrollIntoView({ behavior: 'smooth' });
  });

  function render() {
    var list = filtered();
    var pages = Math.max(1, Math.ceil(list.length / PER));
    if (state.page > pages) state.page = pages;
    var slice = list.slice((state.page - 1) * PER, state.page * PER);

    $('#cards').innerHTML = slice.map(card).join('');
    $('#empty').hidden = list.length > 0;
    $('#count').textContent = list.length;
    $('#countWord').textContent = plural(list.length, 'заявка', 'заявки', 'заявок');
    pager(pages);

    $$('.cat', catsEl).forEach(function (b) { b.classList.toggle('is-on', +b.dataset.cat === state.cat); });
    $$('#fStatus button').forEach(function (b) { b.classList.toggle('is-on', b.dataset.v === state.status); });

    var c = chips();
    $('#chips').innerHTML = c.map(function (x) {
      return '<button type="button" class="chip" data-chip="' + esc(x[0]) + '">' + esc(x[1]) + ' <b aria-hidden="true">×</b><span class="sr">убрать</span></button>';
    }).join('');
    var badge = $('#fBadge');
    var n = c.filter(function (x) { return x[0] !== 'q' && x[0] !== 'cat'; }).length + (state.status !== 'open' ? 1 : 0);
    badge.hidden = !n;
    badge.textContent = n;
  }

  function update(keepPage) {
    if (!keepPage) state.page = 1;
    render();
  }
  render();

  /* ---------- формы ---------- */
  var txt = $('#reqText');
  txt.addEventListener('input', function () { $('#reqCount').textContent = txt.value.length; });
  $('#reqFile').addEventListener('change', function () {
    $('#reqFileName').textContent = this.files[0] ? this.files[0].name : 'Прикрепить спецификацию';
  });
  $('#reqForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = this, bad = null;
    $$('[required]', form).forEach(function (el) {
      var ok = el.checkValidity() && el.value.trim() !== '';
      el.closest('.field').classList.toggle('is-err', !ok);
      if (!ok && !bad) bad = el;
    });
    if (bad) { bad.focus(); toast('Заполните обязательные поля'); return; }
    var ok = $('#reqOk');
    ok.hidden = false;
    ok.textContent = 'Заявка «' + form.title.value.trim() + '» принята. Опубликуем после проверки — обычно до 30 минут.';
    form.reset();
    $('#reqCount').textContent = '0';
    $('#reqFileName').textContent = 'Прикрепить спецификацию';
  });
  $$('#reqForm [required]').forEach(function (el) {
    el.addEventListener('input', function () { el.closest('.field').classList.remove('is-err'); });
  });
  $('#subForm').addEventListener('submit', function (e) {
    e.preventDefault();
    toast('Готово! Подборка придёт на ' + this.querySelector('input').value);
    this.reset();
  });

  /* ---------- мобильная кнопка: прячем у формы ---------- */
  var mobcta = $('.mobcta');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      mobcta.classList.toggle('is-hidden', en.some(function (x) { return x.isIntersecting; }));
    }).observe($('#form'));
  }
})();
