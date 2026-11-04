export const stepLabels = {
  tags: '키워드',
  downloads: '설치 링크',
  installNotes: [
    'Windows: Git for Windows(Git Bash)를 먼저 설치한 뒤 OpenCode와 GitHub CLI(gh)를 설치한다. OpenCode는 공식 안내의 독립 실행 파일로, gh는 공식 MSI 파일이나 winget으로 설치한다.',
    'macOS: 터미널에서 git --version으로 Git을 확인한다. 개발자 도구 설치 안내가 나타나면 안내에 따라 설치하고, OpenCode와 gh는 공식 안내를 따른다. gh는 brew install gh로도 설치한다.',
    'Linux: 배포판 패키지 관리자로 Git과 gh를 설치하고, OpenCode는 공식 안내를 따른다.',
  ],
}
