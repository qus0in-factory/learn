---
subtitle: "Git 호스팅 서비스와 다른 버전 관리 도구를 구분한다."
tags: ["GitLab", "Bitbucket", "Mercurial", "SVN"]
---

# 호스팅과 버전 관리

## 같은 Git, 다른 서비스

GitHub·GitLab·Bitbucket의 Git 저장소는 Git 원격 저장소다. 로컬에서 커밋을 만들고 원격과 clone·fetch·pull·push로 이력을 주고받는 기본 개념은 같다. 원격 주소와 인증 방법, 접근 권한은 서비스에 맞게 설정한다.

반면 이슈·리뷰 댓글·자동화 설정은 Git 커밋 이력 자체가 아니다. 원격 주소만 바꾼다고 이 정보가 모두 옮겨지는 것은 아니므로 서비스의 이전 안내를 따로 확인한다.

서비스별 기능 이름과 운영 방식

| 구분 | GitHub | GitLab | Bitbucket Cloud |
|---|---|---|---|
| 변경 제안·리뷰 | Pull Request(PR) | Merge Request(MR) | Pull Request(PR) |
| CI/CD 자동화 | GitHub Actions | GitLab CI/CD | Bitbucket Pipelines |
| 정적 웹 게시 | GitHub Pages | GitLab Pages | bitbucket.io 정적 사이트 |
| 운영 방식 | 이 과정은 GitHub.com 사용 | GitLab.com 또는 Self-Managed 설치 | Atlassian이 운영하는 Cloud 서비스 |

PR과 MR은 브랜치의 변경을 검토하고 병합하는 제안이라는 역할이 비슷하다. 화면과 승인 규칙, 권한 설정까지 같은 것은 아니다. [GitLab MR](https://docs.gitlab.com/user/project/merge_requests/)과 [Bitbucket PR](https://support.atlassian.com/bitbucket-cloud/docs/create-a-pull-request/)을 참고한다.

[GitLab Pages](https://docs.gitlab.com/user/project/pages/)는 GitLab CI/CD로 정적 사이트를 빌드·게시한다. [Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/)도 빌드·테스트·배포를 자동화하지만 GitHub Actions 설정을 그대로 실행하는 것은 아니다. [Bitbucket 정적 사이트](https://support.atlassian.com/bitbucket-cloud/docs/publishing-a-website-on-bitbucket-cloud/)는 정해진 이름의 저장소를 사용하는 별도 게시 방식이므로 GitHub Pages와 설정을 구분한다.

## 자체 호스팅

자체 호스팅은 조직이 서버를 준비해 서비스를 설치하고 운영하는 방식이다. [GitLab Self-Managed](https://docs.gitlab.com/install/)가 한 예다. 서버 위치와 운영 정책을 직접 정할 수 있지만 업데이트·백업·접근 권한 관리도 맡는다. Cloud 서비스에서 자체 실행 CI runner를 연결하는 것과 서비스 전체를 자체 호스팅하는 것은 다르다.

서비스를 고를 때는 팀의 기존 도구, 리뷰 방식, 자동화 설정, 서버 운영 여건을 살펴본다. 가격·저장 용량·실행 시간·기능 제공 조건은 바뀔 수 있으므로 선택 시점의 공식 문서와 요금 안내를 확인한다.

## Git이 아닌 도구

- [Mercurial](https://www.mercurial-scm.org/)은 `hg` 명령을 사용하는 분산 버전 관리 시스템으로 Git과 별개의 도구다.
- [Apache Subversion(SVN)](https://subversion.apache.org/)은 중앙 저장소를 중심으로 이력을 관리하는 버전 관리 시스템이다. Git과 별개의 도구이므로 명령과 협업 절차를 따로 익힌다.

호스팅 서비스를 바꾸는 일과 버전 관리 시스템을 바꾸는 일을 구분한다. Git 저장소를 GitLab으로 옮겨도 Git을 쓰지만, Mercurial이나 SVN으로 바꾸려면 이력 변환과 작업 방식도 검토해야 한다.
