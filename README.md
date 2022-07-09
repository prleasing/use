# @prleasing/use

Кастомные Vue 3 хуки

## Установка

Добавьте пакет в свои dependencies, используя npm или yarn

```bash
npm i @prleasing/use
# или
yarn add @prleasing/use
```

## Использование

```vue
<template>
	<button @click="decrement">-</button>
	{{ current }}
	<button @click="increment">+</button>
</template>
<script lang="ts">
import { useCounter } from '@prleasing/use';
import { defineComponent} from 'vue';
export default defineComponent({
    setup() {
	    const {current, increment, decrement} = useCounter({
		    min: 0,
		    max: 20
	    });

	    return {current, increment, decrement};
    }
);
</script>
```

## Список функций

### Состояние

| Функция                          | Описание                      |
| -------------------------------- | ----------------------------- |
| [useState](src/state/state.ts)   | Создает стейт                 |
| [useToggle](src/state/toggle.ts) | Создает переключатель статуса |
| [useModel](src/state/model.ts)   | Обертка над v-model}          |

### События

| Функция                                         | Описание                                     |
| ----------------------------------------------- | -------------------------------------------- |
| [useEventListener](src/event/event-listener.ts) | Вешает обработчик события                    |
| [useWindowResize](src/event/window-resize.ts)   | Вешает обработчик на изменение окна браузера |

### Слежка

| Функция                                                 | Описание                                                    |
| ------------------------------------------------------- | ----------------------------------------------------------- |
| [useIntersectionObserver](src/observer/intersection.ts) | Слежка за появлением элемента в области видимости документа |
| [useMutationObserver](src/observer/mutation.ts)         | Слежка за изменением DOM-элементов                          |
| [useResizeObserver](src/observer/resize.ts)             | Слежка за изменением размера элемента или его потомков      |

### Работа с датой

| Функция                                    | Описание                                    |
| ------------------------------------------ | ------------------------------------------- |
| [useNow](src/date/now.ts)                  | Получение нового инстанса DateTime          |
| [useCurrentTime](src/date/current-time.ts) | Получение текущей даты и времени            |
| [useToday](src/date/today.ts)              | Получение текущего дня                      |
| [useCalendar](src/date/calendar.ts)        | Создает календарь                           |
| [useCountdown](src/date/countdown.ts)      | Создает таймер обратного отсчета            |
| [useDateFormat](src/date/format.ts)        | Форматирует дату DateTime в заданный формат |

### Анимации

| Функция                                                              | Описание                         |
| -------------------------------------------------------------------- | -------------------------------- |
| [useRequestAnimationFrame](src/animation/request-animation-frame.ts) | Обработчик RequestAnimationFrame |
| [useTweenNumber](src/animation/tween.ts)                             | Плавное изменение числа          |

### Утилиты

| Функция                                              | Описание                       |
| ---------------------------------------------------- | ------------------------------ |
| [useEndlessLading](src/pagination/endless-lading.ts) | Постепенная загрузка элементов |

### Утилиты

| Функция                                    | Описание                            |
| ------------------------------------------ | ----------------------------------- |
| [useVisible](src/utils/visible.ts)         | Видимость элемента                  |
| [useCounter](src/utils/counter.ts)         | Счетчик                             |
| [useGeolocation](src/utils/geolocation.ts) | Определение геолокации              |
| [useInterval](src/utils/interval.ts)       | Вызов функции с заданным интервалом |
| [useBodyOverflow](src/utils/overflow.ts)   | Блокировка скола страницы           |

#### Localstorage

| Функция                                                                    | Описание                         |
| -------------------------------------------------------------------------- | -------------------------------- |
| [useLocalStorage](src/utils/localstorage/localstorage.ts)                  | Работа с LocalStorage            |
| [useLocalStorageReactive](src/utils/localstorage/localstorage-reactive.ts) | Реактивная работа с LocalStorage |

#### Mount

| Функция                          | Описание                                      |
| -------------------------------- | --------------------------------------------- |
| [useRef](src/utils/mount/ref.ts) | Связывает DOM элемент/ы с реактивным объектом |
