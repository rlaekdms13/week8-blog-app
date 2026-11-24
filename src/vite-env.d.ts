// import.meta.env에 들어 있는 환경 변수의 타입을 정의한다
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
