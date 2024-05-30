import { IsString, MaxLength, MinLength } from 'class-validator';
import i18n from '../../../config/i18n';
import { ValidationConfig } from '../../../config/validation';

export class LoginDTO {
    @IsString()
    @MinLength(ValidationConfig.userName.minLength, {
        message: i18n.__mf('validation.userName.minLength', { min: ValidationConfig.userName.minLength })
    })
    @MaxLength(ValidationConfig.userName.maxLength, {
        message: i18n.__mf('validation.userName.maxLength', { max: ValidationConfig.userName.maxLength })
    })
    userName: string;

    @IsString()
    @MinLength(ValidationConfig.password.minLength, {
        message: i18n.__mf('validation.password.minLength', { min: ValidationConfig.password.minLength })
    })
    @MaxLength(ValidationConfig.password.maxLength, {
        message: i18n.__mf('validation.password.maxLength', { max: ValidationConfig.password.maxLength })
    })
    password: string;
}