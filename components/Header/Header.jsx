"use client";
import { Context } from "@/app/context/AddToCart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Bag,
  BarChart4,
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  User,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

// Mock Data (Replace with your actual data fetching)
const categories = [
  {
    id: "1",
    name: "Electronics",
    subcategories: ["Laptops", "Phones", "Accessories"],
  },
  { id: "2", name: "Clothing", subcategories: ["Men", "Women", "Kids"] },
  {
    id: "3",
    name: "Home & Garden",
    subcategories: ["Furniture", "Decor", "Tools"],
  },
  {
    id: "4",
    name: "Books",
    subcategories: ["Fiction", "Non-Fiction", "Sci-Fi"],
  },
  {
    id: "5",
    name: "Sports",
    subcategories: ["Clothing", "Equipment", "Shoes"],
  },
];

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currency, setCurrency] = useState(currencies[0]); // Default to USD
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [user, setUser] = useState({ name: "Yousuf" }); // Mock user data.
  const router = useRouter();
  const {
    addCarts,
    handleRemoveFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useContext(Context); // Use the context
  const searchInputRef = useRef(null);
  const [isCartPopoverOpen, setIsCartPopoverOpen] = useState(false);

  // Focus on search input when search modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchTerm);
    setIsSearchOpen(false); // Close the modal after searching
    setSearchTerm("");
  };

  const handleCurrencyChange = (code) => {
    const selectedCurrency = currencies.find((c) => c.code === code);
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // In a real app, you'd fetch user data here
    setUser({ name: "John Doe" }); // Mock user data
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: "" });
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Mobile Menu Animation Variants
  const mobileMenuVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  // Search Modal Animation Variants
  const searchModalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-20%" },
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 text-sm text-gray-300 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span>Welcome to our store!</span>
          <a href="#" className="transition-colors hover:text-white">
            Track Your Order
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-md px-2.5 py-1.5 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                {currency.code} ({currency.symbol}){" "}
                <ChevronDown className="ml-1.5 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 border-gray-200 bg-white text-gray-900 shadow-md">
              {currencies.map((c) => (
                <div
                  key={c.code}
                  className="cursor-pointer px-3 py-1.5 hover:bg-gray-100"
                  onClick={() => handleCurrencyChange(c.code)}
                >
                  {c.code} ({c.symbol})
                </div>
              ))}
            </PopoverContent>
          </Popover>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center rounded-md px-2.5 py-1.5 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  {user.name}
                  <ChevronDown className="ml-1.5 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-gray-200 bg-white text-gray-900 shadow-md">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/orders")}>
                  <Bag className="mr-2 h-4 w-4" /> Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/wishlist")}>
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <BarChart4 className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              className="flex items-center rounded-md px-2.5 py-1.5 text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={handleLogin} // Replace with your actual login logic
            >
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Button>
          )}
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white px-4 py-4 shadow-md sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleNavigation("/")}
          >
            {/* Replace with your actual logo */}
            <span className="text-xl font-bold text-gray-900">AL--BAZAR</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {categories.map((category) => (
                <li key={category.id}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="px-0 font-medium text-gray-700 hover:text-blue-600"
                      >
                        {category.name}{" "}
                        <ChevronDown className="ml-1.5 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-gray-200 bg-white text-gray-900 shadow-lg">
                      {category.subcategories.map((sub) => (
                        <DropdownMenuItem
                          key={sub}
                          onClick={() =>
                            handleNavigation(
                              `/category/${category.id}/${sub.toLowerCase()}`,
                            )
                          }
                        >
                          {sub}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search and Actions (Desktop) */}
          <div className="flex items-center gap-4">
            <div className="relative hidden w-64 md:block">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={handleSearch} // Trigger search on click
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-700 hover:text-blue-600"
              onClick={() => handleNavigation("/wishlist")}
            >
              <Heart className="h-5 w-5" />
              <Badge
                variant="secondary"
                className="absolute -right-1.5 -top-1 rounded-full border-none bg-red-500 px-1.5 text-xs text-white"
              >
                0
              </Badge>
            </Button>
            <Popover
              open={isCartPopoverOpen}
              onOpenChange={setIsCartPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative cursor-pointer text-gray-700 hover:text-blue-600"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <Badge
                    variant="secondary"
                    className="absolute -right-1.5 -top-1 rounded-full border-none bg-red-500 px-1.5 text-xs text-white"
                  >
                    {addCarts.length}
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 border-gray-200 bg-white p-4 text-gray-900 shadow-lg"
                align="end"
              >
                {addCarts.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <>
                    <div className="mb-4 max-h-60 space-y-4 overflow-y-auto">
                      {addCarts.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={+item.image}
                              alt={item.title}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                            <div>
                              <h4 className="text-sm font-semibold">
                                {item.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                Price: {currency.symbol}
                                {item.price.toFixed(2)}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 p-0"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 p-0"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-sm">Total:</span>
                      <span className="text-lg">
                        {currency.symbol}
                        {cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        className="w-full bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => {
                          handleNavigation("/cart");
                          setIsCartPopoverOpen(false);
                        }}
                      >
                        View Cart
                      </Button>
                      <Button
                        className="w-full bg-red-500 text-white hover:bg-red-600"
                        onClick={() => {
                          clearCart();
                          setIsCartPopoverOpen(false);
                        }}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </>
                )}
              </PopoverContent>
            </Popover>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-blue-600 md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          side="left"
          className="w-full border-r border-gray-200 bg-white sm:w-[300px]"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
            <SheetDescription>
              <div className="relative mt-4 w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {categories.map((category) => (
              <div key={category.id}>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-gray-700 hover:text-blue-600"
                  onClick={() => handleNavigation(`/category/${category.id}`)}
                >
                  {category.name}
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="ml-4 space-y-2">
                  {category.subcategories.map((sub) => (
                    <Button
                      key={sub}
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-blue-600"
                      onClick={() =>
                        handleNavigation(
                          `/category/${category.id}/${sub.toLowerCase()}`,
                        )
                      }
                    >
                      {sub}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-600"
                  onClick={() => handleNavigation("/profile")}
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-600"
                  onClick={() => handleNavigation("/orders")}
                >
                  <Bag className="mr-2 h-4 w-4" /> Orders
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-600"
                  onClick={() => handleNavigation("/wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-600"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <BarChart4 className="mr-2 h-4 w-4" /> Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-blue-600"
                onClick={handleLogin}
              >
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Button>
            )}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Close Menu
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
