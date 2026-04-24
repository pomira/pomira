
let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بنجاح');
    
    // جلب العناصر
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    const addCartBtns = document.querySelectorAll('.add-cart');
    const closeBtn = document.querySelector('.close');
    const sendOrderBtn = document.getElementById('sendOrder');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const colorSelect = document.getElementById('color');

    console.log('عدد أزرار الإضافة:', addCartBtns.length);

    // فتح السلة من الأيقونة
    cartIcon.addEventListener('click', function() {
        console.log('تم الضغط على أيقونة السلة');
        if (cart.length > 0) {
            updateCartDisplay();
            cartModal.style.display = 'block';
        } else {
            alert('🛒 السلة فارغة! أضف منتجات أولاً');
        }
    });

    // إضافة المنتجات للسلة
    addCartBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            console.log('تم الضغط على زر الإضافة:', index);
            
            const product = this.closest('.product');
            const name = product.dataset.name;
            const price = parseInt(product.dataset.price);
            
            const qty = prompt(`📦 كم "${name}" تريد إضافته؟`, '1');
            
            if (qty !== null && qty.trim() !== '' && !isNaN(qty) && parseInt(qty) > 0) {
                const quantity = parseInt(qty);
                
                // البحث عن المنتج الموجود
                let existingItem = cart.find(item => item.name === name);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({
                        name: name,
                        price: price,
                        quantity: quantity
                    });
                }
                
                // تحديث الواجهة
                updateCartCount();
                showAddSuccess(this, quantity);
                console.log('تم إضافة:', cart);
            }
        });
    });

    // إغلاق السلة
    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // إغلاق عند الضغط خارج السلة
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // إرسال الطلب للواتساب
    sendOrderBtn.addEventListener('click', function() {
        const customerName = nameInput.value.trim();
        const customerPhone = phoneInput.value.trim();
        const customerAddress = addressInput.value.trim();
        const selectedColor = colorSelect.value;

        // التحقق من البيانات
        if (!customerName) {
            alert('⚠️ اكتب اسمك من فضلك!');
            nameInput.focus();
            return;
        }

        if (!customerPhone || customerPhone.length < 10) {
            alert('⚠️ اكتب رقم واتساب صحيح!');
            phoneInput.focus();
            return;
        }

        if (cart.length === 0) {
            alert('⚠️ السلة فارغة! أضف منتجات أولاً');
            return;
        }

        // إنشاء رسالة الواتساب
        let whatsappMessage = `🛒=== طلب جديد Body Splash ===🛒\n\n`;
        whatsappMessage += `👤 الاسم: ${customerName}\n`;
        whatsappMessage += `📱 الواتساب: ${customerPhone}\n`;
        whatsappMessage += `📍 العنوان: ${customerAddress}\n`;
        whatsappMessage += `🎨 اللون المطلوب: ${selectedColor || 'غير محدد'}\n\n`;
        whatsappMessage += `━━━━━━━━━━━━━━━━━━━━━\n📦 المنتجات:\n`;

        let totalAmount = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            whatsappMessage += `✨ ${item.name}\n`;
            whatsappMessage += `   الكمية: ${item.quantity} × ${item.price} ج.م = ${itemTotal} ج.م\n\n`;
        });

        whatsappMessage += `━━━━━━━━━━━━━━━━━━━━━\n`;
        whatsappMessage += `💰 الإجمالي الكلي: ${totalAmount} ج.م\n`;
        whatsappMessage += `⏰ ${new Date().toLocaleString('ar-EG')}\n`;
        whatsappMessage += `━━━━━━━━━━━━━━━━━━━━━`;

        // رقم الواتساب بتاعك - غيّره هنا
        const whatsappNumber = '201099573145'; // ضع رقمك هنا بدون + أو 0
        const whatsappURL = `https://wa.me/2${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
// عند فتح السلة
function openOrderModal() {
  // جمع بيانات السلة
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  let orderText = '🛒 الطلب الجديد:\n\n';
  
  cartItems.forEach(item => {
    orderText += `📦 ${item.name}\n`;
    orderText += `الكمية: ${item.quantity}\n`;
    orderText += `السعر: ${item.price} ريال\n\n`;
  });
  
  orderText += `الإجمالي: ${calculateTotal()} ريال`;
  
  document.getElementById('orderDetails').value = orderText;
  new bootstrap.Modal(document.getElementById('orderModal')).show();
}

// عند الضغط على تأكيد
document.getElementById('confirmOrder').addEventListener('click', function() {
  const name = document.getElementById('customerName').value;
  const phone = document.getElementById('customerPhone').value;
  
  if (!name || !phone) {
    alert('يرجى ملء جميع البيانات');
    return;
  }
  
  // إرسال للواتساب
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const orderText = `👤 ${name}\n📱 ${phone}\n\n🛒 الطلب:\n${document.getElementById('orderDetails').value}`;
  
  const whatsappUrl = `https://wa.me/9665xxxxxxxx?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappUrl, '_blank');
  
  // إغلاق الـ Modal وتفريغ السلة
  bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
  localStorage.removeItem('cart');
  alert('تم إرسال الطلب بنجاح! ✅');
});
        // فتح الواتساب
        window.open(whatsappURL, '_self');
        window.close();
        // تنظيف السلة
        cart = [];
        nameInput.value = '';
        phoneInput.value = '';
        addressInput.value = '';
        colorSelect.value = '';
        
        cartModal.style.display = 'none';
        updateCartCount();
        
        alert(`✅ تم إرسال الطلب بنجاح!\n💰 المجموع: ${totalAmount} ج.م\n📱 تحقق من الواتساب`);
    });

    // تحديث عداد السلة
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems || 0;
    }

    // عرض السلة في المودال
    function updateCartDisplay() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #999;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🛒</div>
                    <p>السلة فارغة تماماً</p>
                </div>
            `;
            totalPrice.textContent = '0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div style="flex: 1;">
                    <strong style="font-size: 1.1rem;">${item.name}</strong><br>
                    <small style="color: #666;">${item.quantity} × ${item.price} ج.م = ${itemTotal} ج.م</small>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button onclick="changeQuantity(${index}, -1)" 
                            style="background: #ff6b6b; color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        −
                    </button>
                    <span style="font-weight: bold; font-size: 1.2rem; min-width: 30px; text-align: center;">
                        ${item.quantity}
                    </span>
                    <button onclick="changeQuantity(${index}, 1)" 
                            style="background: #51cf66; color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        +
                    </button>
                    <button onclick="deleteItem(${index})" 
                            style="background: #747d8c; color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer;">
                        ✕
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItemDiv);
        });

        totalPrice.textContent = total;
    }

    // وظائف عامة للأزرار
    window.changeQuantity = function(index, change) {
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            updateCartDisplay();
            updateCartCount();
        }
    };

    window.deleteItem = function(index) {
        if (confirm('هل تريد حذف هذا المنتج؟')) {
            cart.splice(index, 1);
            updateCartDisplay();
            updateCartCount();
        }
    };

    // تأكيد الإضافة
    function showAddSuccess(button, qty) {
        const originalText = button.textContent;
        button.textContent = `✅ ${qty}`;
        button.style.background = 'linear-gradient(45deg, #00b894, #00cec9)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(45deg, #ff1493, #ff69b4)';
        }, 1500);
    }

    // تحديث العداد عند البداية
    updateCartCount();
    console.log('تم تهيئة الصفحة كاملة');
});