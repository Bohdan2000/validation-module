import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service'; // Adjust the import path based on your project structure
import { UserSchema, ProductSchema } from './schemas/index'; // Import your defined schemas
import { ProductSize } from './enums';

describe('ValidationService', () => {
  let validationService: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationService],
    }).compile();

    validationService = module.get<ValidationService>(ValidationService);
  });

  describe('validateData', () => {
    // Test successful validation
    it('should return true for a valid user object', async () => {
      const validUser = { name: 'John Doe', age: 30, email: 'test@gmail.com' };
      const isValid = await validationService.validateData(
        UserSchema,
        validUser,
      );
      expect(isValid).toBe(true);
    });

    it('should return true for a valid product object', async () => {
      const validProduct = {
        title: 'Table',
        price: 1000,
        size: ProductSize.M,
        material: 'wood',
      };
      const isValid = await validationService.validateData(
        ProductSchema,
        validProduct,
      );
      expect(isValid).toBe(true);
    });

    // Test validation failures
    it('should return false for an invalid user object', async () => {
      const invalidUser = { name: 123, age: 'invalidAge' }; // Intentionally incorrect types
      const isValid = await validationService.validateData(
        UserSchema,
        invalidUser,
      );
      expect(isValid).toBe(false);
    });

    it('should return false for a product object missing required fields', async () => {
      const incompleteProduct = { title: 'Tablet', size: ProductSize.L }; // Missing price
      const isValid = await validationService.validateData(
        ProductSchema,
        incompleteProduct,
      );
      expect(isValid).toBe(false);
    });
  });
});
