export const numberWithSpaces = (x: string | number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// export const numberWithSpaces = (x: string | number) => {
//     var parts = x.toString().split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//     return parts.join(".");
// }