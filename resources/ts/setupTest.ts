import "@testing-library/jest-dom";

// type StoreType = { [key: string]: string };
// const sessionStorageMock = () => {
//     console.log("sessionStorageMock");
//     let store: StoreType = {};

//     return {
//         getItem(key: string) {
//             return store[key];
//         },
//         setItem(key: string, value: string) {
//             store[key] = value.toString();
//         },
//         removeItem(key: string) {
//             delete store[key];
//         },
//         clear() {
//             store = {};
//         },
//     };
// };
// Object.defineProperty(window, "sessionStorage", {
//     value: sessionStorageMock,
// });
