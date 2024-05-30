import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationConfig } from '../../../config/validation';
import i18n from '../../../config/i18n'

export class CreateUserDTO {
    @IsString()
    @MinLength(ValidationConfig.userName.minLength, {
        message: i18n.__mf('validation.userName.minLength', { min: ValidationConfig.userName.minLength })
    })
    @MaxLength(ValidationConfig.userName.maxLength, {
        message: i18n.__mf('validation.userName.maxLength', { max: ValidationConfig.userName.maxLength })
    })
    userName: string;

    @IsString()
    @IsEmail({}, { message: i18n.__('validation.email.valid') })
    email: string;

    @IsString()
    @MinLength(ValidationConfig.password.minLength, {
        message: i18n.__mf('validation.password.minLength', { min: ValidationConfig.password.minLength })
    })
    @MaxLength(ValidationConfig.password.maxLength, {
        message: i18n.__mf('validation.password.maxLength', { max: ValidationConfig.password.maxLength })
    })
    password: string;
}