# 교재 구조 프레임워크

새 교재(과정)를 추가할 때 공통으로 따르는 구조, 메타데이터, 내비게이션, SEO 계약, 등록 체크리스트를 정리한다. 현행 `docs/lecture/`(Go Git 集, `/git/`)와 `docs/easy/`(Go Git 集 순한맛, `/git-easy/`), `learn-site/.vitepress/` 코드(`dev` `a3b0e2e` 기준)를 근거로 삼는다.

## 목차

- [0. 용어와 식별자](#_0-용어와-식별자)
- [1. 교재 표준 구성 요소](#_1-교재-표준-구성-요소)
- [2. 레슨 스키마와 골격](#_2-레슨-스키마와-골격)
- [3. 사이드바·내비 규칙](#_3-사이드바·내비-규칙)
- [4. SEO·구조화 계약](#_4-seo·구조화-계약)
- [5. 새 과정 추가 체크리스트](#_5-새-과정-추가-체크리스트)
- [6. 하지 말 것](#_6-하지-말-것)
- [7. 위험과 미확인 항목](#_7-위험과-미확인-항목)
- [미결정 항목](#미결정-항목)

## 0. 용어와 식별자

| 용어 | 뜻 | 근거 |
|---|---|---|
| 과정 id | URL 첫 세그먼트이자 코드 식별자. 현재 `git`, `git-easy`를 쓴다 | `courses.mjs:9,16`, `easy-labels.mjs:2` |
| 원본 디렉터리 | `docs/<src>/`. 현재 `lecture`→`git`, `easy`→`git-easy`로 id와 다르다 | `pages.mjs:2-12` |
| 과정 첫 페이지 | `docs/course-<id>.md` → `/<id>/` | `pages.mjs:2,9` |
| 레슨 | `NN-slug.md` (2자리 번호 + 영문 kebab). 정규식 `^\d{2}-[\w-]+\.md$` | `nav-items.mjs:9`, `scripts/learn/paths.mjs:12`, `pdf.mjs:21` |
| STEP NN | 표시 계층이 사이드바 순서로 붙이는 라벨. 원본에 쓰지 않는다 | `step-label.mjs:3-5`, `course-contents.mjs:8`, `content-style.md` 3-1 |

## 1. 교재 표준 구성 요소

### 1-1. 구성 요소 표

| # | 요소 | 필수 | 원본 경로 | URL | 코드 등록 지점(현행) | 근거 |
|---|---|---|---|---|---|---|
| 1 | 과정 첫 페이지 | 필수 | `docs/course-<id>.md` | `/<id>/` | `pages.mjs` rewrite, `courses.mjs`, `page-data.mjs:20-24`/`easy.mjs`(제목 덮어쓰기) | `course-git.md`, `course-git-easy.md` |
| 2 | 레슨 | 필수 | `docs/<src>/NN-slug.md` | `/<id>/NN-slug` | `nav-groups.mjs`/`<id>-nav.mjs`, `seo-course-of.mjs:3-6` lessonPattern | `nav-items.mjs:7-18`, `easy-pages.mjs:1` |
| 3 | 레슨 그룹(단계) | 필수 | 코드(nav 모듈)에 순서 배열 | 없음(사이드바 그룹) | git: `nav-groups.mjs:8-12` 3단계(`groups`), easy: `easy-nav.mjs:15-17` 주제 섹션 | 3절 |
| 4 | 실습 | 선택 | easy: `github-practice/`, `git-practice/` 하위; git: 레슨 안 `## 따라하기` 절 | `/<id>/<practice>/NN-slug` | `easy-pages.mjs:2-5`(고정 목록), `seo-course-of.mjs:5`, `scripts/learn/paths.mjs:15-22` | `easy-nav.mjs:11` collapsed 그룹 |
| 5 | 부록 | 선택 | `docs/<src>/appendix/NN-slug.md` | `/<id>/appendix/NN-slug` | `appendix-nav.mjs:3-9`(그룹·순서), `appendix-labels.mjs`, `pages.mjs:5` | 번호 미표기 `content-style.md` 3-6 |
| 6 | 명령어/레퍼런스 | 선택 | `docs/<src>/commands/<name>.md` | `/<id>/commands/<name>` | `commands.json`(그룹·순서), `command-nav.mjs`, `command-labels.mjs`, `pages.mjs:6` | `commands/add.md:1-5`, `<CommandLinks />` |
| 7 | 용어 사전 | 필수 | `glossary.json` + `glossary.md` | `/<id>/glossary` | `glossary.mjs:31-32`, `seo-glossary-schema.mjs:5-8`, `site-theme.mjs:9`, `GlossaryList.vue:11-12` | 1-3절 |
| 8 | 태그 | 필수 | 레슨 frontmatter `tags` (원본) + `tags.md` 껍데기 | `/<id>/tags` | `tag-groups.mjs:30-35`, `pdf.mjs:13`, `TagGroups.vue:12,16`, `markdown-widgets.mjs:10` | `tag-groups.mjs:8` 주석 "Step tags are the source" |
| 9 | 복습 퀴즈(페이지 내) | 레슨형 필수 / 입문형 D-3 | 레슨 끝 `## 복습 퀴즈 <QuizHelp />` + `::정답::` | 없음 | `quiz-blank.mjs`, `QuizHelp.vue`, `markdown-widgets.mjs:12` | `01-environment.md:137-141`, `content-style.md` 3-11 |
| 10 | D1 카탈로그·퀴즈 10문항 | 선택(현재 git만) | `catalog.md`, `data/learn-quiz.md` | `/<id>/catalog`, `/api/catalog` | `scripts/sync-learn-d1.mjs`, `scripts/learn/lectures.mjs:14`(day·schedule 필수), `scripts/learn/meta.mjs:5`(제목 고정) | 5-3절, D-12 |
| 11 | PDF 덱 | 선택 | git: `scripts/learn-pdf/pilot/stepNN.json`+`subjects.json`; easy: `scripts/learn-pdf-easy/`+`easy-names.mjs` | `files.qus0in.dev/v0.1.0/[<prefix>/]<name>.pdf?revision=` | `pdf.json`(frozen), `pdf-easy.json`(revision·prefix), `pdf-url.mjs:16`, `easy-pdf.mjs:14`, `pdf.mjs:20-24` | `docs/setup/pdf-release.md` |
| 12 | Gist 예제 | 선택 | git: `scripts/learn-pdf/gists.json`(키 `NN-slug`); easy: `scripts/learn-gist-easy/gists.json`(키 `git-easy/<path>`) | 외부 | `course-data.mjs:5-9`, `StepHeader.vue:7,10` | D-11 |
| 13 | 삽화·스크린샷 | 선택 | `<Illustration name alt />`, `<Screenshot name alt />` | CDN `/illust-<name>-<w>.webp`, `/shot-<name>-<w>.webp` | `illustrations.json`(prefix `illust-`), `markdown-illustrations.mjs:5-13` | 전 과정 공용 네임스페이스, D-14 |
| 14 | 표지·OG·QR | 필수(코드 자동) | `courses.mjs image`, `og.json images` | `/og-<key>.jpg`, `/course-<id>-qr.svg` | `og-image.mjs:8`(모든 과정 `git` 키), `course-share.mjs:3-4`, `course-qr.mjs:23` | D-13 |
| 15 | 사이드바 아이콘 | 선택 | `nav-icons.json` | — | 키가 `/`로 시작하지 않으면 `/git/` 접두 (`nav-icons-plugin.mjs:19`) | 새 과정은 절대 경로 키 필수 |
| 16 | 설치 안내 | 선택 | frontmatter `installation: true`, `downloads: [id...]` | — | `install-links.json` id, `install-page.mjs`(`/git/appendix/00-installation` 고정) | `git-practice/02-init-commit.md:5-6` |

### 1-2. 디렉터리·URL 규칙

- 원본은 `docs/<src>/`에만 둔다. 운영·규칙 문서는 `docs/operations/`, `docs/setup/`, `docs/ci.md`, `docs/deployment.md`, `docs/content-style.md`, `docs/course-framework.md`에 두고 `pages.mjs:15-18 excluded`로 빌드에서 제외한다. 원본 디렉터리 안에 운영 문서를 두면 PDF source hash가 바뀐다(`scripts/learn-pdf/source-revision.mjs:19-20`은 `docs/lecture`·`scripts/learn-pdf`를, `scripts/learn-pdf-easy/revision.mjs:21-22`는 `docs/easy`·`scripts/learn-pdf-easy`를 걷는다).
- URL은 `cleanUrls: true`(`config.mjs:22`). 본문 링크에 `.html`을 쓰지 않는다(`site-build.test.mjs:8-13`이 거부한다).
- 같은 과정 안의 링크는 상대 `.md` 경로(`glossary.md#slug`, `appendix/05-os-differences.md`)로 쓴다. Markdown 내보내기가 `.md` 링크를 절대 URL로 변환한다(`markdown-export.mjs:10-14`). 다른 과정으로 가는 링크는 절대 경로 `/<id>/...`를 쓴다(`docs/easy/05-git-principle.md:155-159`, `docs/easy/01-what-is-github.md:9`).
- `index.md`는 과정 디렉터리 안에 두지 않는다. `docs/lecture/index.md`는 미게시 강사용 일정표로 `excluded`에 있다(`pages.mjs:17`, `content-style.md` 4절). 과정 첫 페이지는 `docs/course-<id>.md`다.

### 1-3. 용어 사전 계약

```json
{
  "groups": [{ "id": "repo", "text": "저장소와 기록" }],
  "terms": [{
    "term": "버전 관리", "slug": "version-control", "group": "repo",
    "definition": "…다.", "plain": "…", "steps": ["01-environment"],
    "commands": [], "tags": ["VCS"]
  }]
}
```

- 필드 사용처: `term`·`definition`·`plain`·`slug`·`group`은 `glossary.mjs:16-23`, `markdown-glossary.mjs:20`, `seo-glossary-schema.mjs:15-18`(DefinedTerm `@id`=`url#slug`, `name`=term, `description`=definition)에서 읽는다. `steps`는 과정 상대 경로(`github-practice/01-signup-and-repo` 형식 허용, `docs/easy/glossary.json:27-30`), `commands`는 `commands/<name>` 페이지로 매핑(`glossary.mjs:21`), `tags`는 `/tags#slug` 링크(`GlossaryLinks.vue:14`)에 쓴다.
- `glossary.md`는 frontmatter `title`·`subtitle`·`aside: false`와 `# 용어 사전`, `<GlossaryList />`만 둔다(`docs/easy/glossary.md`).
- easy PDF의 `glossary` 슬라이드는 `term` 문자열 정확 일치로 정의를 찾고, 없으면 빌드 실패한다(`scripts/learn-pdf-easy/easy-glossary.mjs:3,10`). `term` 표기를 바꾸면 덱 JSON도 함께 바꿔야 한다.
- 두 과정은 `groups` 4개(`repo`·`collab`·`web`·`env`)를 같은 id로 쓴다(`docs/lecture/glossary.json:2-19`, `docs/easy/glossary.json:2-19`). 새 과정은 주제에 맞게 정의하되 id는 영문 소문자를 쓴다.

### 1-4. 태그 데이터 계약

- 원본은 레슨·부록 frontmatter `tags` 배열이다. `tags.md`는 `<TagGroups />` 껍데기만 둔다(`docs/lecture/tags.md`). 집계는 `buildTagGroups`(`tag-groups.mjs:9-21`)가 하고, 명령어 페이지는 `stepRefs`로 레슨 태그를 상속한다(`tag-groups.mjs:17-19`).
- 파서 제약: frontmatter의 `tags:`는 한 줄 JSON 배열만 읽는다(`course-frontmatter.mjs:8` 정규식 `^tags:\s*(\[.*\])`). YAML 다중 행 목록은 집계에서 빠진다.
- 태그 slug: `tagSlug` 한 규칙(`tag-slug.mjs:3`)을 쓴다. 헤더 칩(`StepTags.vue:16`)과 `/tags#slug` 앵커가 같은 함수를 쓴다.
- 과정 첫 페이지의 `tags`(`course-git-easy.md:3`)는 집계 대상 디렉터리(`docs/easy/`) 밖이므로 태그 페이지에 나타나지 않는다(`tag-groups.mjs:31,34`). 새 과정에서는 첫 페이지 `tags`를 요구하지 않는다.

## 2. 레슨 스키마와 골격

### 2-1. 메타데이터 키

| 키 | 타입 | 필수 | 사용처 | 근거 |
|---|---|---|---|---|
| `subtitle` | string, `~한다`로 끝나는 목적 문장 1개 | 필수 | 헤더 부제(`StepHeader.vue:14`), description 2순위(`seo-records.mjs:11-12`) | `content-style.md` 3-2 |
| `tags` | 한 줄 JSON 배열 | 필수 | 헤더 칩, 태그 페이지, `teaches`(`seo-course-parts.mjs:20`) | 1-4절 |
| `stepHeader` | `true` | 조건부 | 공통 헤더 표시. git은 `pdf` 주입 또는 `appendix/` 경로면 자동(`step-header-flag.mjs:1-6`), easy는 수동 `stepHeader: true`(`docs/easy/01-what-is-github.md:2`) | D-2 |
| `description` | 40~90자 | 권장 | description 1순위(`seo-records.mjs:8`) | 4-2절, D-9 |
| `installation` | `true` | 선택 | 설치 CTA(`StepInstallCta.vue`, 세부 미확인) | `01-environment.md:4` |
| `downloads` | `install-links.json` id 배열 | 선택 | 다운로드 목록 | `appendix/00-installation.md:4` |
| `day`, `schedule` | 숫자, 문자열 | D1 연동 시 필수 | `scripts/learn/lectures.mjs:7-15`가 없으면 throw | `content-style.md` 3-5(본문 금지, frontmatter만) |
| `title`, `aside: false` | — | tags/glossary 전용 | H1 대신 제목 지정(`docs/lecture/tags.md:2-3`) | 레슨은 H1이 제목 원천(`nav-items.mjs:15`, `easy-nav.mjs:9`) |
| `command`, `stepRefs` | — | 명령어 페이지 전용 | `commands/add.md:2,4`; `CommandLinks`·태그 상속 | `tag-groups.mjs:27` |
| `pdf` | 코드 주입 | 직접 쓰지 않음 | `pdf.mjs:20-24`가 `(0[1-9]|1[0-2])-` 파일에만 주입 | 12개 가정(7절 위험 1) |

- `order` 키는 존재하지 않는다. 순서는 파일명 `NN`이며 `order` 문자열(`STEP 01`)은 `course-contents.mjs:8`이 계산한다. 새 과정도 frontmatter에 순서를 두지 않는다.
- `title`은 레슨에 쓰지 않는다. `nav-items.mjs:15`·`easy-nav.mjs:9`가 `# ` H1을 읽어 사이드바 텍스트로 쓰고, `displayTitle`이 `N차시.`·`부록 N.` 접두를 제거한다(`display-text.mjs:8-10`).

### 2-2. 본문 골격

| 유형 | 적용 대상 | 골격 순서 | 근거 |
|---|---|---|---|
| A. 레슨형 | git 12 STEP 공통 | `# <개념명 13자 안팎>` → `## 학습 목표` → 개념·예시(1~3개 H2, 16자 이하) → `## 따라하기` → `## Git 명령`(주제에 맞는 명령/코드 절) → `## 에이전트 요청 예시`(선택) → `## 체크리스트` → `## 트러블 슈팅`(표: `증상\|원인\|대응`) → `## 주의할 점` → `## 복습 퀴즈 <QuizHelp />`(3문항 이상, `::정답::`) | `01-environment.md:11-137`, `12-pull-request.md:10-156`, `content-style.md` 3-4 |
| B. 입문 개념장 | easy `01`·`02`·`04`·`05` | 도입 문단(H1 바로 아래) → 주제 H2 2~5개 → `## 추가자료`(다른 과정 관련 STEP 절대 링크). 학습 목표·퀴즈 절 없음 | `docs/easy/01-what-is-github.md:9-13`, `05-git-principle.md:153-159` |
| C. 입문 실습장 | easy `*-practice/` | 도입 1~2문장 + 준비 절차 → 절차 H2 → (`## 트러블 슈팅`) → `## 추가자료` | `git-practice/02-init-commit.md:62` |
| D. 명령어 페이지 | `commands/<name>.md` | `# git <name>` → `## 용도` → `## 자주 쓰는 옵션`(표) → `## 예시` → `## 주의할 점` → `<CommandLinks />` | `commands/add.md` |
| E. 부록 | `appendix/*.md` | 자유 구성이나 `## 왜 필요한가`·`## 핵심 개념`·`## 체크리스트`·`## 주의할 점`·`## 복습 퀴즈` 다수. 새 과정은 `content-style.md` 3-4 고정 명칭만 쓴다 | `appendix/08-vi-editor.md`, `appendix/11-environment-secrets.md` |

### 2-3. 문체·검사

- `docs/content-style.md`를 전부 적용한다(평서체, H1 13자, H2/H3 16자, 번호·일정 메타 본문 금지, `참고한다`, 학습 목표 `~할 수 있다`, 연속 인라인 코드 금지 등).
- 자동 검사 범위가 `docs/lecture`에 고정돼 있다: `scripts/verify-local.sh:32`(lint-markdown `docs/lecture README.md`), `:50`(content-lint `docs/lecture`), `content-style.md:6`("`docs/lecture/**/*.md`에 적용"). `docs/easy`는 자동 검사 대상이 아니다(D-4).

## 3. 사이드바·내비 규칙

### 3-1. 표준 사이드바 형식

```text
<과정 제목>                      ← 비링크 최상단 그룹 (예: 'Go Git 集', 'Go Git 集 순한맛')
<그룹 1 라벨>  (예: Git Newbie / GitHub)
  레슨 목록
<그룹 2 라벨>  (예: Git Amateur / Git)
<그룹 3 라벨>  (예: Git Pro)
부록 (collapsed, 하위 그룹)       ← 있을 때만
명령어 (collapsed, 하위 그룹)     ← 있을 때만
─────
태그 모아보기 (아이콘 tags)
용어 사전     (아이콘 book-open)
```

### 3-2. 현행 구현과 기준

| 항목 | 현행 구현 (`dev` `a3b0e2e`) | 새 과정 설계 시 고려점 | 근거 |
|---|---|---|---|
| 최상단 과정 제목 | git·easy 모두 비링크 최상단 그룹으로 통일됐다 (`{ text: labels.courseTitle, groups: [...] }`, `{ text: 'Go Git 集 순한맛', items: [...] }`) | 새 과정도 비링크 최상단 그룹 아래에 단계 그룹을 둔다 | `nav-groups.mjs:8-12`, `easy-nav.mjs:15-22` |
| 레슨 그룹 | git은 `groups` 3단계(`Git Newbie` 01~04, `Git Amateur` 05~08, `Git Pro` 09~12), easy는 `GitHub`·`Git` 2개 섹션과 collapsed 실습 그룹으로 구성한다 | 본문·frontmatter에 단계명을 넣지 않고 코드 `order` 배열로 선언한다(`content-style.md` 3-1). 라벨 원문·키 위치는 D-5·D-6 | `nav-groups.mjs:9-11`, `easy-nav.mjs:11,16-17` |
| 레슨 목록 평탄화 | `courseLessons`가 `sidebar['/git/'][0].items.flatMap((group) => group.items)`로 3개 그룹의 레슨을 평탄화한다 | `sidebar['/<id>/'][0]` 구조를 바꾸면 `course-data.mjs`·`nav.test.mjs:9-13`도 함께 맞춰야 한다 | `course-data.mjs:6`, `nav.test.mjs:9-13` |
| 하단 링크·아이콘 | git·easy 모두 `{ items: [태그 모아보기, 용어 사전] }`을 둔다. `nav-icons.json`에 `/git/`(접두 생략 키 `tags`·`glossary`)과 `/git-easy/glossary`·`/git-easy/tags` 아이콘이 모두 등록됐다 | 새 과정은 `/<id>/tags`, `/<id>/glossary`를 포함한 모든 항목을 절대 경로 키로 등록한다 | `nav-groups.mjs:15-18`, `easy-nav.mjs:18-21`, `nav-icons.json:41,47,65,66` |
| 사이드바 키·pager | `site-theme.mjs:8`이 `/git/`·`/git-easy/` 접두 매칭, `nav.mjs:9-11`이 `flatten(sidebar)`로 pager를 만든다 | 그룹을 나눠도 flatten 순서가 같으면 pager는 유지된다 | `site-theme.mjs:8`, `nav.mjs:9-11` |
| 브레드크럼(화면) | `CourseBreadcrumb.vue:9` 정규식에 `git/…`·`git-easy/…`가 하드코딩돼 있다 | 새 과정 추가 시 정규식에 `<id>/`를 추가한다 | `CourseBreadcrumb.vue:9` |

### 3-3. 과정 간 링크 규칙

- 과정 첫 페이지 첫 문단에 상대 과정 링크 1문장을 둔다(`course-git.md:3`, `course-git-easy.md:8`).
- 입문형 레슨 끝 `## 추가자료`에 `[STEP NN 제목](/git/NN-slug)` 형식을 쓴다(`docs/easy/05-git-principle.md:155-159`). 링크 텍스트의 `STEP NN`은 표시 계층 규칙(`content-style.md` 3-1)과 같은 형식을 쓴다.
- 레슨형에서 다른 과정으로 가는 링크는 본문 안 문장 링크로 쓴다(`docs/easy/01-what-is-github.md:9`에서 git 부록 참조). 매 레슨 반복 안내는 금지한다(`content-style.md` 3-7).
- 사이트 링크 검사는 `/git/`·`/git-easy/`·`/`·`/licenses`·`/privacy`만 허용한다(`site-link-checks.mjs:11`). 새 과정 경로를 넣지 않으면 빌드 후 테스트가 실패한다.

### 3-4. 제목 템플릿

easy 레슨만 `titleTemplate` `:title | Go Git 集 순한맛 Git·GitHub 입문`을 쓴다(`seo-meta.json:10`, `page-data.mjs:30-34`). git은 VitePress 기본(`:title | 에코익힘책`)을 쓴다(D-7).

## 4. SEO·구조화 계약

생성 경로는 `page-data.mjs:35-36` → `og-page.mjs`, `seo-page.mjs` → `schemas()`(`seo-schema.mjs:6-11`) → `courseGraph`(`seo-course-schema.mjs`) + `glossaryGraph` 순서다.

### 4-1. 페이지별 스키마

| 페이지 | `@type` | 필수 속성(코드가 넣는 것) | 근거 |
|---|---|---|---|
| 홈 `/` | `WebSite` + `WebPage` + `Organization`(publisher, `founder`) | `description`(`seo-meta.json descriptions['/']`) | `seo-root-schema.mjs:5-12` |
| 과정 첫 페이지 | `Course` | `@id`=`absolute(course.link)`, `name`, `description`, `url`, `inLanguage: ko-KR`, `provider: meta.publisher`(Organization `@id` 포함), `author`·`publisher`·`license`·`dateModified`(·`datePublished`), `isAccessibleForFree: true`, `image`, `about`/`teaches`(레슨 제목 배열), `hasPart[LearningResource{name,url}]` | `seo-course-schema.mjs:14-24`, `seo-course-parts.mjs:6-12`, `seo-page-properties.mjs` |
| 레슨 | `LearningResource` | `learningResourceType: Lesson`, `isPartOf: { '@id': <Course @id> }`(참조만), `teaches: tags`, `isAccessibleForFree`, `image`, (easy만) `educationalLevel: Beginner` | `seo-course-schema.mjs:19-23`, `117-seo-retrospective.md:65-73` |
| `/tags`, `/catalog` | `CollectionPage` | 공통 속성 | `seo-course-schema.mjs:12,15` |
| `/glossary` | `WebPage` + `mainEntity{@id: url#terms}` + `DefinedTermSet` + `DefinedTerm[]` | `@id: url#terms`·`url#slug`, `name`, `description`, `url`, `inDefinedTermSet` | `seo-course-schema.mjs:13,18`, `seo-glossary-schema.mjs:13-19` |
| 모든 페이지 | `BreadcrumbList`: 사이트 › 과정 › 페이지 | `courses.mjs` 기반 자동 | `seo-breadcrumbs.mjs:5-11` |

계약:

1. 레슨의 `isPartOf`는 `@id`만 가진 참조이고, 완전한 `Course`는 과정 첫 페이지에 같은 `@id`로 존재해야 한다(`117-seo-retrospective.md:69-71`). `name`·`description`·`provider`가 비어 있으면 리치 결과 오류가 난다.
2. 과정 첫 페이지 `hasPart`의 소스는 과정별 분기다(`seo-course-parts.mjs:16-19`): git은 `courseOrder` 중 `/git/\d`, easy는 `easySidebar` 평탄화 후 `courseOf().isLesson`을 쓴다. 새 과정은 분기 추가 또는 공통화가 필요하다.
3. `isCollection`·`isGlossary` 판정 정규식이 `(?:git|git-easy)`를 하드코딩한다(`seo-course-schema.mjs:12-13`). 새 과정 id를 넣지 않으면 tags·glossary가 `WebPage`로 떨어지고 glossary `mainEntity`가 빠진다.
4. `educationalLevel`은 `course.id === 'git-easy'` 조건이다(`seo-course-schema.mjs:20`, D-8).

### 4-2. 설명문 규칙

- 우선순위: frontmatter `description` → `seo-meta.json descriptions[path]` → `subtitle`(과정 `summary`와 다를 때만) → 과정별 조합 문장 → `site.subtitle`(`seo-records.mjs:7-19`).
- 길이는 40~90자, 색인 대상 전체에서 중복 0을 유지한다(`117-seo-retrospective.md:9`). `subtitle`을 과정 `summary`와 같게 쓰면 무효 처리된다(`seo-records.mjs:12`).
- easy 레슨은 `제목 — 과정명. 부제` 조합을 기본으로 쓴다(`seo-records.mjs:13-14`). git은 `subtitle` 그대로가 다수이고 짧은 것은 `seo-meta.json:20-59`에 개별 문장을 넣었다(D-9).

### 4-3. OG·사이트맵

- OG: 레슨은 `og:type=article` + `article:published_time`·`modified_time`(`og-page.mjs:25,30-32`), 그 외는 `website`다. `og:image`는 `courseOf(p).course`가 있으면 전부 `git` 키(`/og-git.jpg`, alt는 `courses[0].image.alt`)다(`og-image.mjs:8,15`, D-13).
- sitemap: 404 제외 전체 페이지, `lastmod`는 git 마지막 커밋이다(`seo-options.mjs:6-14`, `sitemap-lastmod.mjs:35-37`). URL→원본 매핑은 `pages.mjs` rewrite를 역산하므로(`sitemap-lastmod.mjs:24-33`), 새 과정의 rewrite가 빠지면 lastmod가 비어 sitemap에 날짜가 안 들어간다.
- `robots.txt`·`llms.txt`·`llms-full.txt`·페이지별 `.md`(`seo-build.mjs`, `discovery-files.mjs`): `llms.txt` 섹션 분류 `group()`은 `/git/`·`/appendix/`·`/commands/`를 하드코딩해 그 외 경로를 "사전 및 안내"(index 3)로 보낸다(`discovery-index.mjs:5-6`, `seo-meta.json:63`, D-10).
- 검증 기준: JSON-LD 파싱 성공은 유효성과 다르다. 타입별 필수 속성·중첩 노드·`@id` 참조 일치를 각각 확인하고, 배포 뒤 리치 결과 테스트 결과를 따로 기록한다(`echo-verify/SKILL.md:14`, `117-seo-retrospective.md:73,132`).

## 5. 새 과정 추가 체크리스트

### 5-1. 원본 작성

1. `docs/course-<id>.md`: `<CourseHeader />`, 상대 과정 교차 링크 1문장, `## {{ learningGoals }}`(또는 `## 학습 목표`), 목차. H1은 쓰지 않는다(`CourseHeader.vue:15`가 `courses.title`을 렌더하고, `page-data.mjs:20-24`가 title을 덮어쓴다).
2. `docs/<src>/NN-slug.md` 레슨(2절 스키마·골격), 선택 하위 디렉터리(`appendix/`, `commands/`, `<practice>/`).
3. `docs/<src>/glossary.json` + `glossary.md`, `tags.md`(1-3·1-4절).
4. 모든 레슨에 `description`(D-9 채택 시)과 한 줄 JSON `tags`.

### 5-2. 코드 등록 지점

| 순서 | 파일 | 할 일 | 근거 행 |
|---|---|---|---|
| 1 | `learn-site/.vitepress/<id>-labels.mjs`(신규) | id·title·summary·coverAlt·그룹 라벨 | `easy-labels.mjs` 패턴 |
| 2 | `courses.mjs` | 항목 추가(id·title·summary·link·image). 랜딩 카드·브레드크럼·QR이 이 배열을 읽는다 | `:7-22`, `CourseList.vue:12`, `seo-breadcrumbs.mjs:6`, `course-qr.mjs:15` |
| 3 | `pages.mjs` | rewrite `course-<id>.md`→`<id>/index.md`, `<src>/:page`, 하위 디렉터리별 `:page` | `:1-13` |
| 4 | `seo-course-of.mjs` | `lessonPattern['<id>']` 추가(레슨·하위 디렉터리 정규식) | `:3-6` |
| 5 | `<id>-nav.mjs`(신규) + `site-theme.mjs` | 사이드바 `{ '/<id>/': [...] }` 3-1 형식, `sidebar` 병합 | `easy-nav.mjs`, `site-theme.mjs:8` |
| 6 | `<id>-pages.mjs`(신규, `learn-site/`) | 빌드 기대 페이지 고정 목록 | `easy-pages.mjs` |
| 7 | `seo-course-parts.mjs` | `hasPart` 소스 분기 | `:16-19` |
| 8 | `seo-course-schema.mjs` | `isCollection`·`isGlossary` 정규식, `educationalLevel` 조건 | `:12-13,20` |
| 9 | `seo-glossary-schema.mjs`, `glossary.mjs`, `site-theme.mjs`, `GlossaryList.vue`, `markdown-glossary.mjs` | `termsByPath['/<id>/glossary']`, `buildGlossary(...)` export, themeConfig 키, 과정 분기(현재 `isEasy` 2분법 `GlossaryList.vue:11-12`, `markdown-glossary.mjs:11-14`) | 각 파일 |
| 10 | `tag-groups.mjs`, `pdf.mjs:13`, `TagGroups.vue:12,16`, `markdown-widgets.mjs:10`, `tag-labels.mjs` | 과정 태그 그룹 export·themeConfig·화면·Markdown 분기, 과정별 intro 문구 | `117-seo-retrospective.md:123` |
| 11 | `seo-records.mjs` | description 조합 분기(D-9에 따라 생략 가능) | `:13-14` |
| 12 | `page-data.mjs`(+`easy.mjs` 패턴) | 과정 첫 페이지 title 덮어쓰기, `titleTemplate`(D-7) | `:20-34` |
| 13 | `step-header-flag.mjs` 또는 레슨 frontmatter | `stepHeader` 자동화 범위(D-2) | `:1-6` |
| 14 | `StepHeader.vue` | PDF·Gist 분기(`e?.[path]`는 `git-easy/`만, gists import 경로 고정) | `:7,10` |
| 15 | `CourseBreadcrumb.vue` | 표시 정규식에 `<id>/` 추가 | `:9` |
| 16 | `nav-icons.json` | 절대 경로 키로 아이콘 지정(`/<id>/tags`, `/<id>/glossary` 포함) | `nav-icons-plugin.mjs:19` |
| 17 | `discovery-index.mjs`, `seo-meta.json sections` | `llms.txt` 섹션(D-10) | `:5-6` |
| 18 | `og.json`, `og-image.mjs`, `course-share.mjs`, `course-qr.mjs` | 표지·OG 키·QR(D-13). QR은 `/course-<id>-qr.svg`로 자동 fallback | `course-share.mjs:4` |
| 19 | `seo-meta.json descriptions` | 과정 첫 페이지·tags·glossary(·catalog) 설명 40~90자 | `:15-19,61` |
| 20 | `site-link-checks.mjs` | 허용 접두에 `/<id>/` 추가(없으면 빌드 테스트 실패) | `:11` |
| 21 | `site-pages.mjs`, `site-page-checks.mjs` | `expectedPages`에 `<id>-pages` + `<id>/tags.html`·`glossary.html` 추가, 총수 `71`·git 하위 `51` 갱신 | `site-pages.mjs:7-9`, `site-page-checks.mjs:6-7` |
| 22 | `docs/deployment.md:9-10`, `docs/operations/index.md` | 현재 구성 문장·현재 상태 갱신(기존 문서 수정, 새 CI 아님) | — |

테스트 수치(`71`·`51`·`46` 문구 `site-build.test.mjs:7`)와 `site-link-checks` 허용 목록 수정은 기존 테스트의 기대값 변경이다. `AGENTS.md`는 "요청하지 않은 테스트 추가"를 금지하므로, 새 과정 작업 지시에 "기대값 갱신 포함"을 명시해 승인 범위에 넣는다.

### 5-3. 선택 연동 결정

| 연동 | 기본값 권고 | 켤 때 필요한 것 | 근거 |
|---|---|---|---|
| PDF 덱(R2) | 끔 | `scripts/learn-pdf-<id>/`, `learn-site/.vitepress/pdf-<id>.json {revision, prefix:'<id>/'}`, `<id>-pdf.mjs`, `pdf.mjs themeConfig`·`StepHeader.vue` 분기, `learn-worker` PDF 요청 테스트, 업로드 스크립트, `pdf-release.md`의 승인·readback | `easy-pdf.mjs:7-19`, `echo-deploy/SKILL.md:23` |
| Gist | 끔 | `scripts/learn-gist-<id>/gists.json`(키 `<id>/<path>` 권고, D-11) + publish 스크립트, `StepHeader.vue` 조회 | `scripts/learn-gist-easy/gists.json`, `publish-git-easy-gists.mjs:6-10` |
| D1 카탈로그·`/api/catalog` | 끔 | `lectures.mjs` `day`·`schedule` 필수(`:14`), `scripts/learn/meta.mjs:5` 제목 고정, `catalog-sql.mjs` 단일 과정 스키마, `wrangler.jsonc` legacy 패턴. 다과정 지원은 스키마 변경이 필요하다(D-12) | `scripts/sync-learn-d1.mjs`, `docs/setup/d1-sync.md` |
| 레슨 내 복습 퀴즈 | 레슨형 켬 | `::정답::` 표기와 `<QuizHelp />` | `quiz-blank.mjs` |
| 삽화 | 선택 | `illustrations.json` prefix가 전 과정 공용(`illust-`). `<id>-` 접두 또는 `stems` 매핑(D-14). 업로드는 `scripts/static-assets/` 절차 | `illustration-stem.mjs:5`, `deployment.md:38-49` |

### 5-4. 검증·배포 순서

1. 작성 중: `docs/content-style.md`를 수동 대조하고, `node scripts/content-lint.mjs docs/<src>`를 실행한다(D-4 전까지는 수동 실행).
2. 커밋 전: `echo-verify` 스킬에 따라 `scripts/verify-local.sh`를 실행한다. 구조화 데이터는 파싱과 함께 필수 속성·`@id` 참조를 확인한다(`echo-verify/SKILL.md:14`).
3. 브랜치·커밋: `git-handoff` 스킬을 따른다(`feat/<slug>` from `dev`, 메시지 `<type>(<scope>): …`).
4. 배포: `echo-deploy` 스킬 순서(clean dev·정확 SHA CI → 운영 값 재빌드 → PDF revision 변경 시 R2 업로드·SHA 대조 선행 → `static-assets/deploy.mjs` → `readback.sh` → 리치 결과 테스트 → `docs/operations/index.md` 기록 → `discord-notify`)를 따른다.
5. 완료 보고는 로컬 검증·운영 빌드·배포·readback·외부 도구 판정·소유자 작업·알림을 구분한다(`117-seo-retrospective.md:131`).

## 6. 하지 말 것

| 금지 | 이유·근거 |
|---|---|
| 용어 `slug` 변경 | 본문 앵커 `glossary.md#slug`(`01-environment.md:13`), `DefinedTerm @id`(`seo-glossary-schema.mjs:16`), 태그 페이지 링크가 깨진다 |
| 용어 `term` 표기만 바꾸기 | easy PDF `glossary` 슬라이드가 `term` 정확 일치로 찾아 빌드 실패(`easy-glossary.mjs:10`). 덱 JSON과 함께 바꾼다 |
| 새 코드에 `'/git/'`·`courses[0]`·`'git-easy'` 리터럴 분기 추가 | 과정 판별은 `courseOf`·`coursePrefix`(`seo-course-of.mjs:8-24`)로 한다. 현존 하드코딩(`og-image.mjs:8,15`, `discovery-index.mjs:5-6`, `site-link-checks.mjs:11`, `CourseBreadcrumb.vue:9`, `seo-course-schema.mjs:12-13,20`, `nav-icons-plugin.mjs:19`, `course-data.mjs:6`, `pdf.mjs:21`, `GlossaryList.vue:11`, `TagGroups.vue:12,16`, `install-page.mjs:3`)은 새 과정 추가 때 일반화 대상이다 |
| 공통 UI 문구에 특정 과정의 구조 전제 넣기 | easy 태그 안내가 git 전용 "부록·명령어 참조"를 약속했던 사례(`117-seo-retrospective.md:123`). 과정별 라벨로 분리한다 |
| 본문·H1·링크 텍스트에 `N차시`·`부록 N.`·단계명 쓰기 | 순서·그룹은 메타데이터다(`content-style.md` 3-1, 3-6). 사이드바 코드가 붙인다 |
| 일정·환경 메타 줄을 본문에 두기 | `day`·`schedule`은 frontmatter만 쓴다(3-5). 본문에 두면 PDF seal이 깨진다 |
| 같은 안내를 모든 레슨에 반복 | 3-7. 과정 첫 페이지 한 곳에 둔다 |
| `subtitle`을 과정 `summary`와 같게 쓰기 | description 후보에서 무효가 된다(`seo-records.mjs:12`) |
| `tags`를 YAML 다중 행으로 쓰기 | 집계 파서가 한 줄 JSON 배열만 읽는다(`course-frontmatter.mjs:8`) |
| `.html` 링크, `<id>/index.md` 생성, 운영 문서를 `docs/<src>` 안에 두기 | `site-build.test.mjs:8`, `pages.mjs:17`, source hash(`source-revision.mjs:19`)에 걸린다 |
| 레슨 `isPartOf`에 `@type: Course`만 있는 불완전 객체 | 리치 결과 오류가 재발한다(`117-seo-retrospective.md:69`) |
| 테스트 기대값을 낮추거나 CI를 먼저 바꾸기, 요청 없는 테스트·CI 추가 | `AGENTS.md`, `117-seo-retrospective.md:55,129,132`. 기대값 갱신은 작업 지시에 명시해 승인받는다 |
| 본문 수정과 고정 PDF 교체를 한 작업으로 묶기 | 별도 작업·승인이다(`117-seo-retrospective.md:134`, `pdf-release.md:3`) |
| 비밀값(.env 값·webhook)을 문서·보고에 기록 | `deployment.md:24`, `117-seo-retrospective.md:63,113` |
| 소유 파일 목록에 import 호출자 빠뜨리기 | `markdown-widgets.mjs`·`markdown-glossary.mjs`·`seo-course-parts.mjs` 누락 사례(`117-seo-retrospective.md:87`). 5-2 표를 소유 목록의 기본으로 쓴다 |

## 7. 위험과 미확인 항목

### 7-1. 위험

1. `pdf.mjs:21` 정규식 `(0[1-9]|1[0-2])`과 `course-data.mjs:6` `sidebar['/git/'][0]` 가정은 "레슨 12개·첫 최상단 그룹"을 전제한다. 13개 이상 레슨이나 첫 그룹 구조 변경은 PDF 주입·목차 열·테스트(`easy-pdf.test.mjs:13` 12개 고정)를 깨뜨린다.
2. 2분법(`isEasy`) 분기가 5곳 이상이라 세 번째 과정은 기본값으로 git 데이터를 받는다(`GlossaryList.vue:12`, `TagGroups.vue:12`, `markdown-widgets.mjs:10`, `markdown-glossary.mjs:11`, `seo-records.mjs:13`). 등록 누락이 조용히 잘못된 화면을 만든다.
3. `site-link-checks.mjs:11`·`site-pages.mjs` 수치 때문에 새 과정은 반드시 기대값 변경을 동반한다. 승인 없이는 CI 통과가 불가능하므로 기획 단계에서 범위에 넣는다.
4. 리치 결과 유효성은 로컬에서 자동 판정되지 않는다. 배포 후 외부 도구 판정을 별도 완료 조건으로 둔다(`117-seo-retrospective.md:73`).
5. `docs/easy`는 자동 린트 범위 밖이다. 새 과정도 D-4 결정 전까지는 같은 공백이 생긴다.

### 7-2. 미확인 항목

- `.github/workflows/ci.yml` 본문(직접 읽지 않고 `docs/ci.md`·`verify-local.sh`만 근거로 삼았다).
- `learn-worker/index.js`의 legacy 301 로직 본문(fixture `legacy-route-fixture.mjs`만 확인했다).
- `learn-worker/pdf-easy-request.test.mjs` 내용(존재만 확인했다).
- `StepInstallCta.vue`·`LessonLinks.vue` 세부(`installation`·`downloads` 표시 방식).

## 미결정 항목

| ID | 결정 | 선택지 | 권고 |
|---|---|---|---|
| D-1 | 원본 디렉터리 이름 | `docs/<id>/` vs 임의 이름 + rewrite | `docs/<id>/` (`urlToDoc`·`course-frontmatter.mjs` 단순화) |
| D-2 | `stepHeader` 자동화 | frontmatter 수동(easy 방식) vs `step-header-flag.mjs`에 과정 패턴 | 자동화(누락 방지) |
| D-3 | 본문 필수 절 집합(레슨형/입문형) | 레슨형·입문형 최소 절 범위 | 레슨형 6절(`학습 목표`·개념 절·`따라하기`·`트러블 슈팅`·`주의할 점`·`복습 퀴즈`) 필수, 입문형 3절(도입·주제 절·`추가자료`) 필수 |
| D-4 | 새 디렉터리 lint·content-lint 포함 | `verify-local.sh` 인자 변경(=CI 동기 필요) | 사용자 승인 후 포함(`AGENTS.md`) |
| D-5 | 레슨 그룹 선언 위치 | nav 모듈 `order` 배열 vs frontmatter | nav 모듈(`nav-groups.mjs`·`easy-nav.mjs` 방식) |
| D-6 | 그룹 라벨 원문·키 | 코드 리터럴 vs `labels.mjs` 키 분리 | `labels.mjs` 키로 관리, 원문은 사용자 확정 |
| D-7 | 새 과정 `titleTemplate` | 과정 키워드 템플릿 vs 기본 | 과정별 템플릿(`search-analytics.md:17`) |
| D-8 | `educationalLevel` 등 과정 메타 | `courses.mjs` 항목 필드 vs id 분기 | `courses.mjs` 필드 |
| D-9 | description 원천 | frontmatter 필수 vs `seo-meta.json` | 레슨은 frontmatter 필수, 비레슨은 `seo-meta.json` |
| D-10 | `llms.txt` 섹션 분류 | 과정별 섹션 vs 현행 | 과정별 섹션 |
| D-11 | Gist 키 형식 | `NN-slug`(git) vs `<id>/<path>`(easy) | `<id>/<path>` |
| D-12 | D1 카탈로그 다과정 지원 | 미지원 유지 vs 스키마 확장 | 새 과정은 미연동(기본 끔) |
| D-13 | 과정별 OG·표지 | 공용 git 표지 vs 과정별 | 과정별(`og.json images[<id>]`) |
| D-14 | 삽화 이름 네임스페이스 | `<id>-` 접두 vs `stems` 매핑 | `<id>-` 접두 |
