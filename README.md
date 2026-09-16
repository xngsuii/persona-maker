# Persona Receipt

AI 채팅용 랜덤 페르소나 메이커. 조건을 고르고 생성하면 영수증 모양으로 페르소나가 출력됩니다.

- 성별 · 국적(혼혈 · OO계 포함) · 나이 범위 지정, 판타지 색상 포함 여부 선택
- 영수증에 넣을 항목을 섹션 · 항목 단위로 선택 (기본: NSFW 제외 전부)
- NSFW: BDSM 성향 테스트 결과 형식 (포지션, 성향 %, 선호 · 비선호 플레이 등)
- 페르소나 테마색 (머리 · 눈 색에서 자동 결정, ORDER# 자리에 표시)
- 영수증 항목 클릭 시 해당 항목만 재생성
- 마크다운 복사 (글자 수 표시), 영수증 PNG 저장
- 머리색 · 눈동자색은 색상코드와 함께 생성 (영수증에서 해당 색으로 표시)
- NovelAI 태그 형식 이미지 프롬프트 (외형 / 표정 / 의상, 표정만 따로 재생성 가능)
- 다크 모드 기본, 라이트 모드 전환 가능 · 선택한 옵션은 브라우저에 저장

## 폰트

- 사이트: [Pretendard](https://github.com/orioncactus/pretendard) (SIL OFL 1.1)
- 영수증: [움돋12](https://monadabxy.com/fonts/umdot/) (SIL OFL 1.1)

둘 다 jsDelivr CDN으로 불러옵니다.

## 구조

```
index.html
css/style.css
js/data.js   ← 키워드 목록 (여기만 고치면 키워드 추가/수정)
js/app.js    ← 생성 · 렌더링 · 복사 · 저장 로직
```

## 로컬 실행

```bash
py -m http.server 5173
```

http://localhost:5173 접속.

## 배포

GitHub 저장소 Settings → Pages → Branch `main` / `(root)` 선택.
