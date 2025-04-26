import React from "react";
import { useCartStore } from "@/stores/CartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, X, Plus, Minus } from "lucide-react";

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, removeItem, totalCart } =
    useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <div
      className="relative font-clash"
      // onMouseEnter={() => setIsOpen(true)}
    >
      {/* Botón del carrito */}
      <div
        onClick={toggleCart}
        
        className="flex justify-center items-center space-x-4 cursor-pointer hover:text-gray-400"
      >
        Carrito
        <button className="relative p-2    transition-colors">
          <ShoppingBag size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500  rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Panel del carrito (se muestra cuando isOpen es true) */}
      {isOpen && (
        <div className="absolute right-0 mt-2  w-80 bg-background rounded-md shadow-lg z-50 max-h-[70vh] overflow-auto">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">Mi Carrito ({cart.length})</h3>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag size={40} strokeWidth={1.5} />
              <p className="mt-2">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <li key={index} className="flex p-4 dark:hover:bg-gray-800">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mr-4">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name || "Producto"}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <ShoppingBag size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="font-semibold text-sm">
                          ${item.price?.toFixed(2)}
                        </span>

                        <div className="flex items-center">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Minus
                              size={16}
                              className="text-gray-600"
                              onClick={() => removeFromCart(item)}
                            />
                          </button>
                          <span className="mx-2 text-sm">{item.quantity}</span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Plus
                              size={16}
                              className="text-gray-600"
                              onClick={() => addToCart(item)}
                            />
                          </button>
                          <button className="p-1 ml-2 hover:bg-gray-100 rounded text-red-500">
                            <Trash2
                              size={16}
                              onClick={() => removeItem(item)}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">${totalCart()}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full  hover:bg-gray-50 ">
                    Ir al Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300  hover:bg-gray-50"
                    onClick={toggleCart}
                  >
                    Seguir comprando
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300  hover:bg-gray-50"
                    onClick={clearCart}
                  >
                    Vaciar carrito
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
