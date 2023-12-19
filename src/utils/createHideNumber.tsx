export const CreateHideNumber = (data: string | undefined) => {
    if (data) {
    const phoneNumber = data;
    const splitNumber = phoneNumber?.split('')
    const hideNumber = splitNumber[0] + splitNumber[1] + splitNumber[2] + ' X' + 'X' + 'X' + ' X' + 'X' + 'X' + ' X' + 'X' + 'X'

    return hideNumber;
    }
    return;
}