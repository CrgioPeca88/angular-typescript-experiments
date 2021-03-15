// Dependencies
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ChangeDetectionStrategy} from "@angular/core";
import {FormsModule} from "@angular/forms";

// Assets
import {CartShopComponent, PRODUCTS} from './cart-shop.component';
import {ProductListComponent} from "./component/product-list/product-list.component";
import {CartComponent} from "./components/cart/cart.component";

describe('CartShopComponent', () => {
  let component: CartShopComponent;
  let fixture: ComponentFixture<CartShopComponent>;
  let compiled;
  let items;

  const getByTestId = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  const getById = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`#${id}`);
  };

  const IDMAPS = {
    ADD_BTN: 'btn-quantity-add',
    SUBTRACT_BTN: 'btn-quantity-subtract',
    ADD_TO_CART_BTN: 'btn-item-add',
    QUANTITY_INPUT: 'cart-quantity'
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartShopComponent,
        ProductListComponent,
        CartComponent
      ],
      imports: [
        FormsModule
      ]
    })
      .overrideComponent(CartShopComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShopComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('Add item to cart', async () => {
    let addToCartBtn, cartQuantity, cartItem, addBtn;
    await fixture.whenStable();
    cartItem = getById('cart-item-0');
    expect(cartItem).toBeFalsy();

    fixture.detectChanges();

    items = compiled.querySelectorAll('.product-item');
    addBtn = getByTestId(IDMAPS.ADD_BTN, items[1]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[1]);
    expect(cartQuantity).toBeTruthy();
    expect(addBtn).toBeTruthy();
    expect(addToCartBtn).toBeTruthy();
    addBtn.click();
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[1]);
    expect(cartQuantity).toBeTruthy();
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    expect(addToCartBtn).toBeTruthy();
    cartItem = getById('cart-item-0');
    expect(cartItem).toBeTruthy();

    const cartItemQuantity = getByTestId('cart-item-quantity', cartItem);
    expect(cartItemQuantity.innerHTML).toEqual('1');
    const cartItemName = getByTestId('cart-item-name', cartItem);
    expect(cartItemName.innerHTML).toEqual(PRODUCTS[1].name);
  });

  it('Update quantity in cart', async () => {
    let addToCartBtn, addBtn, subtractBtn, cartItem, cartQuantity,
      cartItemQuantity;
    await fixture.whenStable();
    items = compiled.querySelectorAll('.product-item');
    addBtn = getByTestId(IDMAPS.ADD_BTN, items[0]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[0]);
    addBtn.click();
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[0]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[0]);
    expect(addToCartBtn).toBeTruthy();
    expect(cartQuantity.value).toEqual('1');
    addBtn = getByTestId(IDMAPS.ADD_BTN, items[0]);
    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[0]);

    addBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(cartQuantity.value).toEqual('2');

    addBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(cartQuantity.value).toEqual('3');

    cartItem = getById('cart-item-0');
    expect(cartItem).toBeTruthy();
    cartItemQuantity = getByTestId('cart-item-quantity', cartItem);
    expect(cartItemQuantity.innerHTML).toEqual('3');

    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(cartQuantity.value).toEqual('2');

    cartItem = getById('cart-item-0');
    expect(cartItem).toBeTruthy();
    cartItemQuantity = getByTestId('cart-item-quantity', cartItem);
    expect(cartItemQuantity.innerHTML).toEqual('2');

  })

  it('Remove item from cart', async () => {
    let addToCartBtn, addBtn, subtractBtn, cartItem;
    await fixture.whenStable();
    items = compiled.querySelectorAll('.product-item');
    addBtn = getByTestId(IDMAPS.ADD_BTN, items[2]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[2]);
    addBtn.click();
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(addBtn).toBeTruthy();
    expect(addToCartBtn).toBeTruthy();

    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[2]);
    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(subtractBtn).toBeTruthy();

    cartItem = getById('cart-item-0');
    expect(cartItem).toBeTruthy();
  })

  it('Performs Series of Actions', async () => {
    let addToCartBtn, addBtn, subtractBtn, cartQuantity,
      cartItem1, cartItem2, cartItem3;

    await fixture.whenStable();
    items = compiled.querySelectorAll('.product-item');
    addBtn = getByTestId(IDMAPS.ADD_BTN, items[3]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[3]);
    addBtn.click();
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[3]);
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[3]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[3]);
    expect(addBtn).toBeTruthy();
    expect(subtractBtn).toBeTruthy();
    expect(cartQuantity).toBeTruthy();
    expect(addToCartBtn).toBeTruthy();

    items = compiled.querySelectorAll('.product-item');
    addBtn = getByTestId(IDMAPS.ADD_BTN, items[1]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    addBtn.click();
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[1]);
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[1]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    expect(addBtn).toBeTruthy();
    expect(subtractBtn).toBeTruthy();
    expect(cartQuantity).toBeTruthy();
    expect(addToCartBtn).toBeTruthy();

    addBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    cartItem2 = getById('cart-item-1');
    expect(cartItem1).toBeTruthy();
    expect(cartItem2).toBeTruthy();
    expect(getByTestId('cart-item-quantity', cartItem1).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-quantity', cartItem2).innerHTML).toEqual('2');
    expect(getByTestId('cart-item-name', cartItem1).innerHTML).toEqual(PRODUCTS[3].name);
    expect(getByTestId('cart-item-name', cartItem2).innerHTML).toEqual(PRODUCTS[1].name);

    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    cartItem2 = getById('cart-item-1');
    expect(cartItem1).toBeTruthy();
    expect(cartItem2).toBeTruthy();
    expect(getByTestId('cart-item-quantity', cartItem1).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-quantity', cartItem2).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-name', cartItem1).innerHTML).toEqual(PRODUCTS[3].name);
    expect(getByTestId('cart-item-name', cartItem2).innerHTML).toEqual(PRODUCTS[1].name);

    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[3]);
    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    expect(cartItem1).toBeTruthy();

    cartItem2 = getById('cart-item-1');
    expect(cartItem2).toBeTruthy();

    addBtn = getByTestId(IDMAPS.ADD_BTN, items[4]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[4]);
    addBtn.click();
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    cartItem2 = getById('cart-item-1');
    cartItem3 = getById('cart-item-2');
    expect(cartItem1).toBeTruthy();
    expect(cartItem2).toBeTruthy();
    expect(cartItem3).toBeTruthy();
    expect(getByTestId('cart-item-quantity', cartItem1).innerHTML).toEqual('0');
    expect(getByTestId('cart-item-quantity', cartItem2).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-quantity', cartItem3).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-name', cartItem1).innerHTML).toEqual(PRODUCTS[3].name);
    expect(getByTestId('cart-item-name', cartItem2).innerHTML).toEqual(PRODUCTS[1].name);
    expect(getByTestId('cart-item-name', cartItem3).innerHTML).toEqual(PRODUCTS[4].name);

  })
});
