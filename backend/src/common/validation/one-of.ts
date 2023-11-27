import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class OneOf implements ValidatorConstraintInterface {
  validate(prop: string, args: ValidationArguments) {
    const possibleValues = args.constraints;

    return possibleValues.includes(prop);
  }

  defaultMessage(args: ValidationArguments) {
    return `${
      args.property
    } must be one of the following: ${args.constraints.join(', ')}`;
  }
}
