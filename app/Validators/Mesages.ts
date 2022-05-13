import { CustomMessages } from '@ioc:Adonis/Core/Validator'
export default class Messages {
    public messages: CustomMessages = {
        required: 'Input {{ field }} wajib diisi!',
        minLength: 'input {{ field }} minimal adalah 6 karakter!',
        confirmed: 'input {{ field }} tidak sesuai tolong lebih diperhatikan kembali!',
        size: 'ukuran file pada input {{ field }} maksimal 2mb!',
        extnames: 'format file yang diperbolehkan pada inputan {{ field }} hanya (.jpg, .png)!',
    }
}