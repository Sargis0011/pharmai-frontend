import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const CATS = {
  hy: {
    all: 'Բոլորը', painkillers: 'Ցավազրկողներ', antibiotics: 'Հակաբիոտիկներ',
    allergy: 'Հակաալերգիկ', gastro: 'Ստամոքս-աղիք', diabetes: 'Շաքարախտ',
    cardio: 'Սիրտ-անոթային', vitamins: 'Վիտամիններ', respiratory: 'Շնչառական',
    nervous: 'Նյարդային', hormonal: 'Հորմոնալ', antiseptics: 'Հակասեպտիկներ',
    antispasmodics: 'Հակասպազմոդիկ', cold: 'Մրսածություն', pediatric: 'Մանկական',
    antiviral: 'Հակավիրուսային', dermatology: 'Մաշկաբանական',
    ophthalmology: 'Աչքաբանական', urology: 'Ուրոլոգիա', other: 'Այլ',
  },
  ru: {
    all: 'Все', painkillers: 'Обезболивающие', antibiotics: 'Антибиотики',
    allergy: 'Антиаллергические', gastro: 'ЖКТ', diabetes: 'Диабет',
    cardio: 'Сердечно-сосудистые', vitamins: 'Витамины', respiratory: 'Дыхательные',
    nervous: 'Нервная система', hormonal: 'Гормональные', antiseptics: 'Антисептики',
    antispasmodics: 'Спазмолитики', cold: 'Простуда', pediatric: 'Детские',
    antiviral: 'Противовирусные', dermatology: 'Дерматология',
    ophthalmology: 'Офтальмология', urology: 'Урология', other: 'Прочее',
  },
  en: {
    all: 'All', painkillers: 'Painkillers', antibiotics: 'Antibiotics',
    allergy: 'Allergy', gastro: 'GI tract', diabetes: 'Diabetes',
    cardio: 'Cardiovascular', vitamins: 'Vitamins', respiratory: 'Respiratory',
    nervous: 'Nervous system', hormonal: 'Hormonal', antiseptics: 'Antiseptics',
    antispasmodics: 'Antispasmodics', cold: 'Cold & flu', pediatric: 'Pediatric',
    antiviral: 'Antiviral', dermatology: 'Dermatology',
    ophthalmology: 'Ophthalmology', urology: 'Urology', other: 'Other',
  },
}

const DISCLAIMER = {
  hy: 'Տեղեկատվությունը կրում է ուսումնական բնույթ։ Բուժման համար դիմեք բժշկի։',
  ru: 'Информация представлена в учебных целях. Перед применением проконсультируйтесь с врачом.',
  en: 'Information is provided for educational purposes. Always consult a doctor before use.',
}

const ABOUT = {
  hy: {
    title: 'PharmAI-ի մասին',
    body: 'PharmAI-ն դեղերի որոնման բազմալեզու հարթակ է՝ Հայաստանի համար։ Այն ստեղծվել է որպես դիպլոմային նախագիծ՝ ցուցադրելու համար, թե ինչպես կարող են բացված տվյալները և ժամանակակից վեբ-տեխնոլոգիաները բարելավել դեղագիտական ինֆորմացիայի հասանելիությունը հիվանդների և մասնագետների համար։',
    features_title: 'Հնարավորությունները',
    features: [
      'Որոնում հայերեն, ռուսերեն և անգլերեն լեզուներով',
      'Մոտ 5500+ դեղերի կանոնականացված բազա',
      'Համանմանների ընտրություն ակտիվ նյութի հիման վրա',
      'Դեղատների ցանցերի և մասնաճյուղերի ուղեցույց',
    ],
    stack_title: 'Տեխնոլոգիաներ',
    diploma: 'Դիպլոմային նախագիծ · 2026',
  },
  ru: {
    title: 'О проекте PharmAI',
    body: 'PharmAI — это мультиязычная платформа поиска лекарств для Армении. Проект разработан как дипломная работа, демонстрирующая, как открытые данные и современные веб-технологии помогают сделать фармацевтическую информацию доступнее для пациентов и специалистов.',
    features_title: 'Возможности',
    features: [
      'Поиск на армянском, русском и английском языках',
      'Канонизированная база ~5500+ препаратов',
      'Подбор аналогов по действующему веществу',
      'Каталог аптечных сетей и филиалов по городам Армении',
    ],
    stack_title: 'Технологии',
    diploma: 'Дипломный проект · 2026',
  },
  en: {
    title: 'About PharmAI',
    body: 'PharmAI is a multilingual medicine search platform for Armenia. It is built as a diploma project to demonstrate how open data and modern web technologies can make pharmaceutical information more accessible for patients and specialists.',
    features_title: 'Features',
    features: [
      'Search in Armenian, Russian and English',
      'Canonicalized catalog of 5500+ medicines',
      'Analog lookup by active substance',
      'Directory of pharmacy chains and branches across Armenia',
    ],
    stack_title: 'Stack',
    diploma: 'Diploma project · 2026',
  },
}

const FAVORITES = {
  hy: {
    title: 'Ընտրյալներ',
    subtitle: 'Ձեր պահպանված դեղերը',
    add: 'Ավելացնել ընտրյալներում',
    remove: 'Հեռացնել ընտրյալներից',
    clear: 'Մաքրել ցանկը',
    empty: {
      title: 'Ընտրյալների ցանկը դատարկ է',
      hint: 'Սեղմեք ♡ կոճակը ցանկացած դեղի վրա՝ այն այստեղ պահպանելու համար։',
      cta: 'Անցնել դեղերին',
    },
  },
  ru: {
    title: 'Избранное',
    subtitle: 'Ваши сохранённые лекарства',
    add: 'Добавить в избранное',
    remove: 'Удалить из избранного',
    clear: 'Очистить список',
    empty: {
      title: 'Список избранного пуст',
      hint: 'Нажмите ♡ на карточке любого лекарства, чтобы сохранить его здесь.',
      cta: 'Перейти к лекарствам',
    },
  },
  en: {
    title: 'Favorites',
    subtitle: 'Your saved medicines',
    add: 'Add to favorites',
    remove: 'Remove from favorites',
    clear: 'Clear list',
    empty: {
      title: 'Your favorites list is empty',
      hint: 'Tap ♡ on any medicine card to save it here.',
      cta: 'Browse medicines',
    },
  },
}

const resources = {
  hy: { translation: {
    brand: 'PharmAI',
    tagline: 'Դեղերի որոնում Հայաստանում',
    disclaimer: DISCLAIMER.hy,
    nav: { home: 'Գլխավոր', medicines: 'Դեղեր', pharmacies: 'Դեղատներ', favorites: 'Ընտրյալներ', about: 'Մեր մասին' },
    search: { placeholder: 'Մուտքագրեք դեղի անունը (HY / RU / EN)…', button: 'Որոնել' },
    filters: { all: 'Բոլորը', category: 'Կատեգորիա' },
    categories: CATS.hy,
    list: { empty: 'Ոչինչ չի գտնվել', total: 'Արդյունքներ', loading: 'Բեռնում…' },
    card: { substance: 'Ակտիվ նյութ', form: 'Ձև', dosage: 'Չափաբաժին',
      manufacturer: 'Արտադրող', country: 'Երկիր', open: 'Բացել' },
    details: { description: 'Նկարագրություն', indications: 'Նշանակումը',
      side: 'Կողմնակի ազդեցություններ', contra: 'Հակացուցումներ',
      analogs: 'Համանմաններ', variants: 'Տարբերակներ',
      none: 'Տվյալներ չկան', back: 'Հետ' },
    pharmacies: {
      title: 'Դեղատների ցանցեր', branches: 'Մասնաճյուղ',
      address: 'Հասցե', phone: 'Հեռախոս', hours: 'Աշխատանքային ժամեր',
      view: 'Տեսնել մասնաճյուղերը', back: 'Բոլոր ցանցերը',
    },
    favorites: FAVORITES.hy,
    lang: { hy: 'Հայերեն', ru: 'Русский', en: 'English' },
    about: ABOUT.hy,
  }},
  ru: { translation: {
    brand: 'PharmAI',
    tagline: 'Поиск лекарств в Армении',
    disclaimer: DISCLAIMER.ru,
    nav: { home: 'Главная', medicines: 'Лекарства', pharmacies: 'Аптеки', favorites: 'Избранное', about: 'О проекте' },
    search: { placeholder: 'Введите название (HY / RU / EN)…', button: 'Найти' },
    filters: { all: 'Все', category: 'Категория' },
    categories: CATS.ru,
    list: { empty: 'Ничего не найдено', total: 'Найдено', loading: 'Загрузка…' },
    card: { substance: 'Действующее вещество', form: 'Форма', dosage: 'Дозировка',
      manufacturer: 'Производитель', country: 'Страна', open: 'Открыть' },
    details: { description: 'Описание', indications: 'Назначение',
      side: 'Побочные эффекты', contra: 'Противопоказания',
      analogs: 'Аналоги', variants: 'Варианты',
      none: 'Нет данных', back: 'Назад' },
    pharmacies: {
      title: 'Аптечные сети', branches: 'Филиалы',
      address: 'Адрес', phone: 'Телефон', hours: 'Время работы',
      view: 'Посмотреть филиалы', back: 'Все сети',
    },
    favorites: FAVORITES.ru,
    lang: { hy: 'Հայերեն', ru: 'Русский', en: 'English' },
    about: ABOUT.ru,
  }},
  en: { translation: {
    brand: 'PharmAI',
    tagline: 'Medicine search in Armenia',
    disclaimer: DISCLAIMER.en,
    nav: { home: 'Home', medicines: 'Medicines', pharmacies: 'Pharmacies', favorites: 'Favorites', about: 'About' },
    search: { placeholder: 'Enter medicine name (HY / RU / EN)…', button: 'Search' },
    filters: { all: 'All', category: 'Category' },
    categories: CATS.en,
    list: { empty: 'Nothing found', total: 'Results', loading: 'Loading…' },
    card: { substance: 'Active substance', form: 'Form', dosage: 'Dosage',
      manufacturer: 'Manufacturer', country: 'Country', open: 'Open' },
    details: { description: 'Description', indications: 'Indications',
      side: 'Side effects', contra: 'Contraindications',
      analogs: 'Analogs', variants: 'Variants',
      none: 'No data available', back: 'Back' },
    pharmacies: {
      title: 'Pharmacy chains', branches: 'Branches',
      address: 'Address', phone: 'Phone', hours: 'Working hours',
      view: 'View branches', back: 'All chains',
    },
    favorites: FAVORITES.en,
    lang: { hy: 'Հայերեն', ru: 'Русский', en: 'English' },
    about: ABOUT.en,
  }},
}

const saved = typeof localStorage !== 'undefined' && localStorage.getItem('pharmai_lang')

i18n.use(initReactI18next).init({
  resources,
  lng: saved || 'hy',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  try { localStorage.setItem('pharmai_lang', lng) } catch {}
  document.documentElement.lang = lng
})

export default i18n
