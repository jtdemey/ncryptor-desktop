/// <reference types="node" />

declare module "gpg" {
  export type GPG = {
    call: Function;
    callStreaming: Function;
    encryptToFile: Function;
    encryptFile: Function;
    encryptToStream: Function;
    encryptStream: Function;
    encrypt: Function;
    decrypt: Function;
    decryptFile: Function;
    decryptToFile: Function;
    decryptStream: Function;
    decryptToStream: Function;
    clearsign: Function;
    verifySignature: Function;
    importKeyFromFile: Function;
    importKey: Function;
    removeKey: Function;
  };
  export function call(stdin: string, args: any[], fn: Function): void;
  export function callStreaming(
    inputFileName: string,
    outputFileName: string,
    args: any[],
    fn: Function
  ): void;
  export function encryptToFile(options: any, fn: Function): void;
  export function encryptFile(file: string, fn: Function): void;
  export function encryptToStream(options: any, fn: Function): void;
  export function encryptStream(
    stream: ReadableStream,
    args: any[],
    fn: Function
  ): void;
  export function encrypt(str: string, args: any[], fn: Function): void;
  export function decrypt(str: string, args: any[], fn: Function): void;
  export function decryptFile(file: string, fn: Function): void;
  export function decryptToFile(options: any, fn: Function): void;
  export function decryptStream(
    stream: ReadableStream,
    args: any[],
    fn: Function
  ): void;
  export function decryptToStream(options: any, fn: Function): void;
  export function clearsign(str: string, args: any[], fn: Function): void;
  export function verifySignature(str: string, args: any[], fn: Function): void;
  export function importKeyFromFile(fileName: string, args: any[], fn: Function): void;
  export function importKey(keyStr: string, args: any[], fn: Function): void;
  export function removeKey(keyID: string, args: any[], fn: Function): void;
}
