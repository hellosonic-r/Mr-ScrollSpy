# 🥸 mr-scrollspy

React에서 ScrollSpy 기능을 간단하게 사용할 수 있도록 만든 **React Hook 라이브러리**입니다.

`IntersectionObserver API`를 사용하여 각 섹션이 viewport에 진입하는 시점을 감지합니다.
<br />
또한, 여러 섹션을 감지하는 경우 불필요한 Observer 생성을 방지하기 위해 `Observer Pooling` 구조를 적용하여 성능을 최적화했습니다.

<br />

## ✅ 주요 기능

- ⚡ IntersectionObserver 기반 ScrollSpy
- 🧠 Observer Pooling으로 불필요한 Observer 생성 방지
- 🪶 Lightweight (~1kb bundle)
- ⚛️ React 18 / 19 지원
- 🧾 TypeScript 지원
- 📦 ESM / CJS 번들 제공


## ✅ 설치

```bash
npm install mr-scrollspy
yarn add mr-scrollspy
```

---

<br />

## ✅ 사용 방법
### 1️⃣ 섹션 ref 생성
ScrollSpy로 감지할 섹션의 ref를 생성합니다.
```jsx
import { useRef } from "react";

const sectionRefs = {
  visual: useRef<HTMLDivElement>(null),
  notice: useRef<HTMLDivElement>(null),
  ai: useRef<HTMLDivElement>(null),
};
```

## 2️⃣ useScrollSpy 사용
현재 화면에 보이는 섹션의 id가 `activeSection` 값으로 반환됩니다.
```jsx
import { useScrollSpy } from "mr-scrollspy";

const activeSection = useScrollSpy({
  sectionRefs,
  offset: 100,
});
```

## 3️⃣ 메뉴 활성화 처리
```html
<ul>
  <li className={activeSection === "visual" ? "active" : ""}>
    Visual
  </li>

  <li className={activeSection === "notice" ? "active" : ""}>
    Notice
  </li>

  <li className={activeSection === "ai" ? "active" : ""}>
    AI
  </li>
</ul>
```

<br />

## ✅ 전체 예제
```jsx
import { useRef } from "react";
import { useScrollSpy } from "mr-scrollspy";

function Page() {
  const sectionRefs = {
    visual: useRef<HTMLDivElement>(null),
    notice: useRef<HTMLDivElement>(null),
    ai: useRef<HTMLDivElement>(null),
  };

  const activeId = useScrollSpy({
    sectionRefs,
    offset: 120,
  });

  return (
    <>
      <nav>
        <button className={activeId === "visual" ? "active" : ""}>
          Visual
        </button>

        <button className={activeId === "notice" ? "active" : ""}>
          Notice
        </button>

        <button className={activeId === "ai" ? "active" : ""}>
          AI
        </button>
      </nav>

      <section ref={sectionRefs.visual}>Visual Section</section>
      <section ref={sectionRefs.notice}>Notice Section</section>
      <section ref={sectionRefs.ai}>AI Section</section>
    </>
  );
}
```

<br />

## ✅ useScrollSpy(options)

- sectionRefs<Record<string, RefObject<HTMLElement>>> : 감지할 섹션 ref 객체
- offset<number> : 스크롤 오프셋(고정 헤더 높이) 

<br />

## ✅ 사용 사례

- 랜딩 페이지 섹션 네비게이션
- 블로그 목차
- 문서 페이지 앵커 네비게이션
- 스크롤 기반 메뉴 활성화 UI
