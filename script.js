// سلة التسوق Body Splash - مضمون 100%
let cart = [];

function initCart() {
    // العناصر
    const cartBtn = document.getElementById('cartIcon');
    const modal = document.getElementById('cartModal');
    const count = document.getElementById('cartCount');
    const sendBtn = document.getElementById('sendOrder');
    const items = document.getElementById('cartItems');
    const total = document.getElementById('totalPrice');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');

    // فتح السلة
    cartBtn.onclick = () => {
        if(cart.length == 0) return alert('السلة فاضية!');
        updateDisplay();
        modal.style.display = 'block';
    };

    // إضافة منتج
    document.querySelectorAll('.add-cart').forEach(btn => {
        btn.onclick = () => {
            let prod = btn.closest('.product');
            let name = prod.dataset.name;
            let price = parseInt(prod.dataset.price);
            let qty = prompt('الكمية:', '1') || 1;
            qty = parseInt(qty);
            
            if(qty > 0) {
                let found = cart.find(p => p.name == name);
                if(found) found.qty += qty;
                else cart.push({name, price, qty});
                updateCount();
                alert('✅ تمت الإضافة');
            }
        };
    });

    // تأكيد الطلب - يفتح الواتساب ليك!
    sendBtn.onclick = () => {
        let cname = name.value.trim();
        let cphone = phone.value.trim();
        
        if(!cname || !cphone || cart.length == 0) {
            return alert('املأ البيانات والسلة!');
        }

        // الرسالة الجاهزة ليك
        let msg = `*طلب Body Splash جديد* 🛒\n\n`;
        msg += `👤 ${cname}\n📱 ${cphone}\n\n*الطلبات:*\n`;
        let sum = 0;
        cart.forEach(p => {
            let ptotal = p.price * p.qty;
            sum += ptotal;
            msg += `• ${p.name} ×${p.qty} = ${ptotal}ج\n`;
        });
        msg += `\n*الإجمالي: ${sum}ج* 💰`;

        // رقمك - الواتساب يفتح عليك!
        let yourNumber = '201037353480'; // غيّر برقمك!
        window.open(`https://wa.me/${yourNumber}?text=${encodeURIComponent(msg)}`);
        
        // تنظيف
        cart = [];
        name.value = phone.value = '';
        modal.style.display = 'none';
        updateCount();
        alert('✅ الواتساب فتح عليك!');
    };

    // إغلاق
    document.querySelector('.close').onclick = () => modal.style.display = 'none';
    window.onclick = e => e.target == modal && (modal.style.display = 'none');

    function updateCount() {
        count.textContent = cart.reduce((a, b) => a + b.qty, 0) || 0;
    }

    function updateDisplay() {
        items.innerHTML = cart.map((p, i) => `
            <div style="display:flex;gap:10px;padding:10px;border-bottom:1px solid #ddd;">
                <div>
                    <b>${p.name}</b><br>
                    <small>${p.qty}×${p.price}ج = ${p.price*p.qty}ج</small>
                </div>
                <button onclick="cart.splice(${i},1);updateDisplay();updateCount();" 
                        style="background:#e74c3c;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">حذف</button>
            </div>
        `).join('') || '<p style="text-align:center;padding:30px;color:#999;">لا يوجد منتجات</p>';
        
        let t = cart.reduce((a, b) => a + (b.price * b.qty), 0);
        total.textContent = t ? t + ' ج.م' : '0 ج.م';
    }
}

// تشغيل الكود
initCart();
console.log('✅ الكود شغال 100%');