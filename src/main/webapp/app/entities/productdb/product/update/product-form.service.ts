import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id'>;

type ProductFormGroupContent = {
  id: FormControl<IProduct['id'] | NewProduct['id']>;
  name: FormControl<IProduct['name']>;
  image: FormControl<IProduct['image']>;
  imageContentType: FormControl<IProduct['imageContentType']>;
  imgname: FormControl<IProduct['imgname']>;
  description: FormControl<IProduct['description']>;
  rating: FormControl<IProduct['rating']>;
  volume: FormControl<IProduct['volume']>;
  code: FormControl<IProduct['code']>;
  reduction: FormControl<IProduct['reduction']>;
  pricetogo: FormControl<IProduct['pricetogo']>;
  pricenej: FormControl<IProduct['pricenej']>;
  pricecot: FormControl<IProduct['pricecot']>;
  priceseneg: FormControl<IProduct['priceseneg']>;
  priceghan: FormControl<IProduct['priceghan']>;
  devisetogo: FormControl<IProduct['devisetogo']>;
  devisenej: FormControl<IProduct['devisenej']>;
  devisecot: FormControl<IProduct['devisecot']>;
  deviseseneg: FormControl<IProduct['deviseseneg']>;
  deviseghan: FormControl<IProduct['deviseghan']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductFormService {
  createProductFormGroup(product: ProductFormGroupInput = { id: null }): ProductFormGroup {
    const productRawValue = {
      ...this.getFormDefaults(),
      ...product,
    };
    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(productRawValue.name),
      image: new FormControl(productRawValue.image),
      imageContentType: new FormControl(productRawValue.imageContentType),
      imgname: new FormControl(productRawValue.imgname),
      description: new FormControl(productRawValue.description),
      rating: new FormControl(productRawValue.rating),
      volume: new FormControl(productRawValue.volume),
      code: new FormControl(productRawValue.code),
      reduction: new FormControl(productRawValue.reduction),
      pricetogo: new FormControl(productRawValue.pricetogo),
      pricenej: new FormControl(productRawValue.pricenej),
      pricecot: new FormControl(productRawValue.pricecot),
      priceseneg: new FormControl(productRawValue.priceseneg),
      priceghan: new FormControl(productRawValue.priceghan),
      devisetogo: new FormControl(productRawValue.devisetogo),
      devisenej: new FormControl(productRawValue.devisenej),
      devisecot: new FormControl(productRawValue.devisecot),
      deviseseneg: new FormControl(productRawValue.deviseseneg),
      deviseghan: new FormControl(productRawValue.deviseghan),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return form.getRawValue() as IProduct | NewProduct;
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = { ...this.getFormDefaults(), ...product };
    form.reset(
      {
        ...productRawValue,
        id: { value: productRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProductFormDefaults {
    return {
      id: null,
    };
  }
}
