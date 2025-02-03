/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_API_KEY: string;
  // 여기에 추가적인 환경 변수들을 정의할 수 있습니다
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
