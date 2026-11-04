---
subtitle: "저장소 권한과 협업 흐름을 확인한다."
tags: ["GitHub", "협업", "Pull Request"]
---

# GitHub 협업

## 초대와 기여

개인 저장소의 소유자는 Settings → Collaborators에서 사람을 초대한다. 초대받은 사람이 수락하면 해당 저장소를 함께 다룰 수 있다. 개인 저장소의 collaborator는 읽기와 쓰기 권한을 갖는다. 조직 저장소에는 역할별 권한이 있으며 조직 정책에 따라 초대가 제한될 수 있다. [개인 저장소 초대](https://docs.github.com/articles/inviting-collaborators-to-a-personal-repository)와 [조직 저장소 역할](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)을 확인한다.

collaborator는 저장소 접근 권한을 받은 사람이고 contributor는 프로젝트에 기여한 사람이다. 기여 이력이 접근 권한을 자동으로 주지는 않는다.

## fork와 PR

원본에 직접 쓰기 권한이 없다면 원본의 설정이 허용하는 경우 다음 흐름으로 기여할 수 있다.

1. GitHub에서 원본 저장소를 fork해 자신의 복사본을 만든다.
2. fork를 clone하고 작업 브랜치를 만든다.
3. 변경을 커밋하고 자신의 fork에 브랜치를 push한다.
4. PR의 base 저장소와 브랜치를 원본으로, head를 자신의 fork 브랜치로 선택해 제안한다.
5. 리뷰에 따라 수정하고 원본 관리자의 병합을 기다린다.

설정에 따라 외부 PR 생성이 제한될 수 있다. [fork에서 PR 만들기](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)를 참고한다.

## PR 리뷰

PR 오른쪽의 `Reviewers`에서 사람이나 팀을 선택해 리뷰를 요청한다. `Assignees`는 PR 작업 담당자를 지정하는 곳으로, 리뷰 요청과 다르다. 리뷰 요청에는 보통 저장소 쓰기 권한이 필요하고, 대상 사람이나 팀은 읽기 권한이 있어야 한다. 팀 리뷰 요청은 요금제와 저장소 공개 여부에 따라 제공된다. 예를 들어 GitHub Free 조직에서는 공개 저장소에 제공되고 GitHub Team에서는 공개·비공개 저장소에 제공된다. [리뷰 요청 안내](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/requesting-a-pull-request-review)와 [권한 안내](https://docs.github.com/en/pull-requests/reference/pull-request-reviews)를 참고한다.

리뷰어는 `Files changed`에서 변경 줄 옆의 `+`를 눌러 질문이나 수정 의견을 적고 `Start a review`를 누른다. 검토를 마치면 `Review changes`에서 의견을 요약하고 `Comment`(의견만 남김), `Approve`(병합 승인), `Request changes`(수정 요청) 중 하나를 골라 `Submit review`를 누른다. 제출 전의 리뷰 댓글은 작성자에게 보이지 않는다. PR 작성자는 자신의 PR을 승인할 수 없다. 수정 요청이 병합을 막는지는 브랜치 보호 규칙과 권한에 따라 달라진다. [리뷰 작성 안내](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/reviewing-proposed-changes-in-a-pull-request)를 참고한다.

PR 작성자는 의견을 확인해 필요한 변경을 커밋하고 같은 브랜치에 push한다. 이후 `Reviewers`에서 해당 리뷰어 옆의 재요청 버튼을 눌러 다시 검토를 요청할 수 있다.

## 조직과 팀

GitHub 프로필 메뉴에서 새 organization을 만들고 요금제와 조직 이름을 선택한다. 조직은 멤버와 저장소를 관리한다. 조직 안에서 팀을 만들어 멤버를 묶고 팀에 저장소 역할을 부여하면 팀 구성원이 그 권한으로 협업한다. 개인별 권한과 조직 정책도 함께 적용될 수 있다. [조직 만들기](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch)와 [팀 관리](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams)를 참고한다.

## 브랜치 보호

브랜치 보호 규칙으로 리뷰나 상태 검사를 요구할 수 있다. [공식 안내](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)에 따르면 GitHub Free의 보호 브랜치는 공개 저장소에서 제공되고, Pro·Team·Enterprise에서는 공개 및 비공개 저장소에서도 제공된다. 세부 옵션은 조직 유형과 요금제에 따라 다를 수 있으므로 설정 전에 안내를 확인한다. [Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)도 별도 제공 조건을 확인한다.

## 생성 제한

저장소 관리자는 설정에서 이슈 생성과 PR 생성을 각각 쓰기 권한이 있는 collaborator로 제한할 수 있다. [이슈 생성 제한 발표](https://github.blog/changelog/2026-06-29-restrict-issue-creation-to-collaborators-only)와 [PR 생성 제한 발표](https://github.blog/changelog/2026-02-13-new-repository-settings-for-configuring-pull-request-access)를 참고한다. 기여 이력만 있는 contributor에게 생성 권한이 자동으로 생기는 설정은 아니다.

이는 공개 저장소에서 기간을 정해 댓글·이슈·PR 등 상호작용을 제한하는 [interaction limits](https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-repository)와 별도다. 같은 페이지의 PR 개수 제한도 생성 권한 설정과 다르다.
