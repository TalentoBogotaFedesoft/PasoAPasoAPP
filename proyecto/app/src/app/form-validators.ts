import { FormGroup } from '@angular/forms';


const PURE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regexValidators = {
  email: PURE_EMAIL_REGEXP
}

export class FormValidators {
    static validate(formGroup: FormGroup) {
        let password = formGroup.controls.password.value;
        let passwordConfirmation = formGroup.controls.passwordConfirmation.value;

        if (passwordConfirmation.length <= 0) {
            return null;
        }

        if (passwordConfirmation !== password) {
            return {
                passwordConfirmed: true
            };
        }
        return null;
    }
}

