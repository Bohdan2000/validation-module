import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ValidationService {
  async validateData(
    schema: new () => any,
    dataObject: object,
  ): Promise<boolean> {
    // Create a new instance of the schema class directly
    const object = new schema();
    // Assign the dataObject properties to the new schema instance
    Object.assign(object, dataObject);

    const errors = await validate(object);
    if (errors.length > 0) {
      console.log('errors', errors);
      return false;
    }
    return true;
  }
}
