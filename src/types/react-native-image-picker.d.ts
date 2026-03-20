declare module 'react-native-image-picker' {
  export type Asset = {
    uri?: string;
    fileName?: string;
    type?: string;
    fileSize?: number;
  };

  export type ImageLibraryOptions = {
    mediaType?: 'photo' | 'video' | 'mixed';
    selectionLimit?: number;
    includeBase64?: boolean;
    quality?: number;
  };

  export type ImageLibraryResponse = {
    assets?: Asset[];
    didCancel?: boolean;
    errorCode?: string | null;
    errorMessage?: string | null;
  };

  export function launchImageLibrary(
    options: ImageLibraryOptions,
    callback: (response: ImageLibraryResponse) => void,
  ): void;

  export {};
}
