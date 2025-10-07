<script setup lang="ts">
import { ref } from 'vue'

const headers = ref([
  { title: '№', key: 'id', align: 'end' },
  { title: 'img', key: 'image', align: 'center', sortable: false }, // Define a key for the custom column
  { title: 'RU', key: 'nameRu', width: '45%', align: 'start' },
  { title: 'RO', key: 'nameRo', width: '45%', align: 'start' }
] as const)
const items = [
  { id: 1, nameRu: 'Тетради', nameRo: 'Caiete' },
  { id: 2, nameRu: 'Бытовая техника', nameRo: 'Aparate De Uz Casnic' },
  { id: 3, nameRu: 'Лампочки', nameRo: 'Becuri' },
  { id: 4, nameRu: 'Игрушки', nameRo: 'Jucării' },
  { id: 5, nameRu: 'Игры развивающие', nameRo: 'Jocuri Educative' },
  { id: 6, nameRu: 'Мяч', nameRo: 'Minge' },
  { id: 7, nameRu: 'Свечи', nameRo: 'Lumanari' },
  { id: 8, nameRu: 'Бадминтон', nameRo: 'Badminton' },
  { id: 9, nameRu: 'Шары', nameRo: 'Mingi' },
  { id: 10, nameRu: 'Батарейки', nameRo: 'Baterii' },
  { id: 11, nameRu: 'Самокат', nameRo: 'Scuter' },
  { id: 12, nameRu: 'Зарядные устройства', nameRo: 'Încărcătoare' },
  { id: 13, nameRu: 'Диски', nameRo: 'Discuri' },
  { id: 14, nameRu: 'Флэшки', nameRo: 'Unități Flash' },
  { id: 15, nameRu: 'Наушники', nameRo: 'Căști' },
  { id: 16, nameRu: 'Микрофон, колонки', nameRo: 'Microfon, Difuzoare' },
  { id: 17, nameRu: 'Комп.для компьютера', nameRo: 'Accesori p-u calculator' },
  { id: 18, nameRu: 'Пяльца', nameRo: 'Cerc p-u broderie' },
  { id: 19, nameRu: 'Канва', nameRo: 'Pânză' },
  { id: 20, nameRu: 'Вышивка', nameRo: 'Broderie' },
  { id: 21, nameRu: 'Сантиметр', nameRo: 'Centimetru' },
  { id: 22, nameRu: 'Нитки', nameRo: 'Ata' },
  { id: 23, nameRu: 'Спицы', nameRo: 'Andrele' },
  { id: 24, nameRu: 'Крючок', nameRo: 'Cârlig' },
  { id: 25, nameRu: 'Молния', nameRo: 'Fermoar' },
  { id: 26, nameRu: 'Иглы', nameRo: 'Ace' },
  { id: 27, nameRu: 'Носки', nameRo: 'Șosete' },
  { id: 28, nameRu: 'Таблетки от комаров', nameRo: 'Tablete Anti-Tantari' },
  { id: 29, nameRu: 'Разукрашка', nameRo: 'Carte De Colorat' },
  { id: 30, nameRu: 'Книги', nameRo: 'Cărți' },
  { id: 31, nameRu: 'Бижутерия', nameRo: 'Bijuterie' },
  { id: 32, nameRu: 'Заколки', nameRo: 'Acele De Păr' },
  { id: 33, nameRu: 'Резинки', nameRo: 'Legatura' },
  { id: 34, nameRu: 'Термос', nameRo: 'Termos' },
  { id: 35, nameRu: 'Сувениры', nameRo: 'Suveniruri' },
  { id: 36, nameRu: 'Зонт', nameRo: 'Umbrelă' },
  { id: 37, nameRu: 'Часы', nameRo: 'Ceas' },
  { id: 38, nameRu: 'Удлинитель', nameRo: 'Prelungitor' },
  { id: 39, nameRu: 'Пакеты', nameRo: 'Punga' },
  { id: 40, nameRu: 'Клей', nameRo: 'Lipici' },
  { id: 41, nameRu: 'Зеркало', nameRo: 'Oglindă' },
  { id: 42, nameRu: 'Фонарик', nameRo: 'Lanternă' },
  { id: 43, nameRu: 'Бисер', nameRo: 'Margele' },
  { id: 44, nameRu: 'Скотч', nameRo: 'Banda adeziva' },
  { id: 45, nameRu: 'Пуговицы', nameRo: 'Nasturi' },
  { id: 46, nameRu: 'Всё для бассейна', nameRo: 'Accesori p-u inot' },
  { id: 47, nameRu: 'Ксерокопия', nameRo: 'Xerocopie' },
  { id: 48, nameRu: 'Распечатка на принтере', nameRo: 'Imprimanta' },
  { id: 49, nameRu: 'Переплет', nameRo: 'Copertare' },
  { id: 50, nameRu: 'Ламинирование', nameRo: 'Laminare' },
  { id: 51, nameRu: 'Акварель', nameRo: 'Acuarelă' },
  { id: 52, nameRu: 'Альбом', nameRo: 'Album' },
  { id: 53, nameRu: 'Антистеплер', nameRo: 'Decapsator' },
  { id: 54, nameRu: 'Бланки', nameRo: 'Formulare' },
  { id: 55, nameRu: 'Медицинские карты', nameRo: 'Fisa medicala' },
  { id: 56, nameRu: 'Бумага цветная', nameRo: 'Hârtie Colorată' },
  { id: 57, nameRu: 'Бумага Xerox', nameRo: 'Hârtie Xerox' },
  { id: 58, nameRu: 'Бумага для заметок', nameRo: 'Hârtie De Notițe' },
  { id: 59, nameRu: 'Урна для бумаг', nameRo: 'Cos de hirtie' },
  { id: 60, nameRu: 'Бэйджик', nameRo: 'Ecusoane' },
  { id: 61, nameRu: 'Ватман', nameRo: 'Hirtie mare Vatman' },
  { id: 62, nameRu: 'Глобус', nameRo: 'Glob' },
  { id: 63, nameRu: 'Гуашь', nameRo: 'Guașă' },
  { id: 64, nameRu: 'Дневник', nameRo: 'Agenda' },
  { id: 65, nameRu: 'Дырокол', nameRo: 'Perforare' },
  { id: 66, nameRu: 'Доска', nameRo: 'Tabla' },
  { id: 67, nameRu: 'Зажим', nameRo: 'Agrafe de birou' },
  { id: 68, nameRu: 'Кассовая лента', nameRo: 'Role de casa' },
  { id: 69, nameRu: 'Карта', nameRo: 'Hartă' },
  { id: 70, nameRu: 'Кнопки', nameRo: 'Pioneze' },
  { id: 71, nameRu: 'Конверт', nameRo: 'Plic' },
  { id: 72, nameRu: 'Калькулятор', nameRo: 'Calculator' },
  { id: 73, nameRu: 'Карандаши', nameRo: 'Creioane' },
  { id: 74, nameRu: 'Корректор', nameRo: 'Corector' },
  { id: 75, nameRu: 'Кисти', nameRo: 'Pensula' },
  { id: 76, nameRu: 'Линейка', nameRo: 'Riglă' },
  { id: 77, nameRu: 'Резинка', nameRo: 'Radiera' },
  { id: 78, nameRu: 'Лупа', nameRo: 'Lupă' },
  { id: 79, nameRu: 'Маркер', nameRo: 'Marker' },
  { id: 80, nameRu: 'Мел', nameRo: 'Cretă' },
  { id: 81, nameRu: 'Ножницы', nameRo: 'Foarfece' },
  { id: 82, nameRu: 'Нож канц.', nameRo: 'Cuțit De Papetărie' },
  { id: 83, nameRu: 'Открытка', nameRo: 'Carte Poştală' },
  { id: 84, nameRu: 'Обложки', nameRo: 'Invelitori' },
  { id: 85, nameRu: 'Посуда', nameRo: 'Feluri De Mâncare' },
  { id: 86, nameRu: 'Палитра', nameRo: 'Paletă' },
  { id: 87, nameRu: 'Пластилин', nameRo: 'Plastilină' },
  { id: 88, nameRu: 'Папка', nameRo: 'Mapa' },
  { id: 89, nameRu: 'Пенал для ручек и карандашей', nameRo: 'Trusa Pentru Pixuri Si Creioane' },
  { id: 90, nameRu: 'Сумка', nameRo: 'Geanta' },
  { id: 91, nameRu: 'Подставка', nameRo: 'Suport' },
  { id: 92, nameRu: 'Печать', nameRo: 'Echipamente p-u stampila' },
  { id: 93, nameRu: 'Чернила', nameRo: 'Cerneală' },
  { id: 94, nameRu: 'Палочки', nameRo: 'Betesoare' },
  { id: 95, nameRu: 'Ручки', nameRo: 'Pixuri' },
  { id: 96, nameRu: 'Кухоная утварь', nameRo: 'Ustensile De Bucătărie' },
  { id: 97, nameRu: 'Ваза', nameRo: 'Vază' },
  { id: 98, nameRu: 'Стержни для ручек', nameRo: 'Mina de stilou' },
  { id: 99, nameRu: 'Стэплер', nameRo: 'Capsator' },
  { id: 100, nameRu: 'Скобы для стэплера', nameRo: 'Capse Pentru Un Capsator' },
  { id: 101, nameRu: 'Счеты', nameRo: 'Abac' },
  { id: 102, nameRu: 'Скрепки', nameRo: 'Clame' },
  { id: 103, nameRu: 'Стакан для воды', nameRo: 'Pahar Pentru Apa' },
  { id: 104, nameRu: 'Регистры', nameRo: 'Registrele' },
  { id: 105, nameRu: 'Точилка', nameRo: 'Ascuţitoare' },
  { id: 106, nameRu: 'Ранцы', nameRo: 'Rucsacuri' },
  { id: 107, nameRu: 'Тубус для листов', nameRo: 'Tub De Foaie' },
  { id: 108, nameRu: 'Упаковка подарков', nameRo: 'Ambalaj Cadou' },
  { id: 109, nameRu: 'Флаг', nameRo: 'Drapela' },
  { id: 110, nameRu: 'Файлы', nameRo: 'Folie' },
  { id: 111, nameRu: 'Фломастеры', nameRo: 'Carioci' },
  { id: 112, nameRu: 'Фомиран листы', nameRo: 'Fomiran Foi' },
  { id: 113, nameRu: 'Фоторамка', nameRo: 'Rama p-u diplome' },
  { id: 114, nameRu: 'Ценники', nameRo: 'Etichete' },
  { id: 115, nameRu: 'Циркуль', nameRo: 'Compas' },
  { id: 116, nameRu: 'Лента', nameRo: 'Panglică' },
  { id: 117, nameRu: 'Термометр', nameRo: 'Termometru' },
  { id: 118, nameRu: 'Замок', nameRo: 'Blocare' },
  { id: 119, nameRu: 'Весы', nameRo: 'Cântare' },
  { id: 120, nameRu: 'Прищепки', nameRo: 'Agrafe De Rufe' },
  { id: 121, nameRu: 'Насос', nameRo: 'Pompa' },
  { id: 122, nameRu: 'Спортивные товары', nameRo: 'Articole Sportive' },
  { id: 123, nameRu: 'Елки', nameRo: 'Pomi De Crăciun' },
  { id: 124, nameRu: 'Новогодние товары', nameRo: 'Bunuri De Anul Nou' },
  { id: 125, nameRu: 'Мишура праздничная', nameRo: 'Beteală Festivă' },
  { id: 126, nameRu: 'Аксесуары', nameRo: 'Accesorii' },
  { id: 127, nameRu: 'Картины', nameRo: 'Picturi' },
  { id: 128, nameRu: 'Цветы искусственные', nameRo: 'Flori Artificiale' },
  { id: 129, nameRu: 'Фрукты искусственные', nameRo: 'Fructe Artificiale' },
  { id: 130, nameRu: 'Блэнлер', nameRo: 'Blenler' },
  { id: 131, nameRu: 'Бритва электрическая', nameRo: 'Brici Electric' },
  { id: 132, nameRu: 'Ремень', nameRo: 'Centura' },
  { id: 133, nameRu: 'Чайник', nameRo: 'Fierbător' },
  { id: 134, nameRu: 'Утюг', nameRo: 'Fier' },
  { id: 135, nameRu: 'Фен', nameRo: 'Uscător De Păr' },
  { id: 136, nameRu: 'Вентилятор', nameRo: 'Ventilator' },
  { id: 137, nameRu: 'Зарядка для телефона', nameRo: 'Incarcator Telefon' },
  { id: 138, nameRu: 'Кабель', nameRo: 'Cablu' },
  { id: 139, nameRu: 'Радио', nameRo: 'Radio' },
  { id: 140, nameRu: 'Ножи', nameRo: 'Cuțite' },
  { id: 141, nameRu: 'Колокольчик', nameRo: 'Clopot' },
  { id: 142, nameRu: 'Магниты', nameRo: 'Magneți' },
  { id: 143, nameRu: 'Настольный органайзер', nameRo: 'Organizator Desktop' },
  { id: 144, nameRu: 'Ногти искусственные', nameRo: 'Unghii Artificiale' },
  { id: 145, nameRu: 'Маникюрные аксесуары', nameRo: 'Accesorii Pentru Manichiura' },
  { id: 146, nameRu: 'Косметика', nameRo: 'Cosmetice' }
]

const search = ref('')
</script>

<template>
  <v-container>
    <v-row class="justify-center pa-0">
      <v-col cols="auto">
        <v-card min-width="800px" max-width="90vw">
          <template #text>
            <v-text-field
              v-model="search"
              :label="$t('search')"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              single-line
              autofocus
            ></v-text-field>
          </template>

          <v-data-table
            density="compact"
            items-per-page="-1"
            hide-default-footer
            hover
            :headers="headers"
            :items="items"
            :search="search"
          >
            <template #[`item.id`]="{ value }: any">
              <b>{{ value }}</b>
            </template>
            <template #[`item.image`]="{ item }: any">
              <img loading="lazy" :src="`/products/${item.id}.png`" height="32" max-width="32" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
