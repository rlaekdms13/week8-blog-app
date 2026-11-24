export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

// 업로드할 수 없는 파일이면 에러 메시지를, 괜찮으면 null을 돌려준다
export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'PNG, JPG, WEBP, GIF 이미지만 올릴 수 있어요.';
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return '이미지는 2MB 이하로 올려 주세요.';
  }
  return null;
}

// 이미지 파일을 Base64 Data URL 문자열로 바꾼다
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('이미지를 읽지 못했어요.'));
    reader.readAsDataURL(file);
  });
}
