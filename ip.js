 let totalPrice = 0;
        let discountAmount = 0;
        let downPaymentAmount = 0;

        // Generate a random invoice number
        function generateInvoiceNumber() {
            const characters = 'BOSLAUNDRY0123456789';
            let result = '';
            for (let i = 0; i < 8; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        // Initialize the invoice number
        const invoiceNumber = generateInvoiceNumber();
        document.getElementById('summaryInvoiceNumber').textContent = invoiceNumber;

        // Handle adding products to the table and updating total price
        document.getElementById('productForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Get input values
            const productName = document.getElementById('productName').value;
            const productPrice = parseFloat(document.getElementById('productPrice').value);

            if (isNaN(productPrice)) {
                alert("Please enter a valid price.");
                return;
            }

            // Update total price
            totalPrice += productPrice;

            // Create a new row in the main table
            const tableBody = document.querySelector('#productTable tbody');
            const newRow = document.createElement('tr');

            newRow.innerHTML = `
                <td>${productName}</td>
                <td>Rp ${productPrice.toFixed(2)}</td>
            `;

            tableBody.appendChild(newRow);

            // Clear the form
            document.getElementById('productForm').reset();

            // Update summary section
            updateSummary();
        });

        // Function to update the summary section
        function updateSummary() {
            // Get customer information
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;

            // Display customer information in the summary section
           const summaryCustomerInfo = document.getElementById('summaryCustomerInfo');
            summaryCustomerInfo.innerHTML = `
                <p><strong>Nama:</strong> ${name}</p>
                <p><strong>Alamat:</strong> ${address}</p>
                <p><strong>Telepon:</strong> ${phone}</p>
            `;

            // Get transaction date
            const transactionDate = document.getElementById('transactionDate').value;
            document.getElementById('summaryTransactionDate').textContent = transactionDate || 'Not Set';

            // Get product data from the main table
            const rows = document.querySelectorAll('#productTable tbody tr');
            const summaryTableBody = document.querySelector('#summaryProductTable tbody');
            summaryTableBody.innerHTML = ''; // Clear previous data

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const productName = cells[0].innerText;
                const productPrice = cells[1].innerText;

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${productName}</td>
                    <td>${productPrice}</td>
                `;

                summaryTableBody.appendChild(newRow);
            });

            // Update total price in the summary section
           document.getElementById('summaryTotalPrice').textContent = `Total Harga: Rp ${totalPrice.toFixed(2)}`;
            document.getElementById('totalPrice').textContent = `Total Harga: Rp ${totalPrice.toFixed(2)}`;

            // Update final price after applying discount and DP
            const finalPrice = totalPrice - discountAmount - downPaymentAmount;
            document.getElementById('summaryFinalPrice').textContent = `Harga Akhir: Rp ${finalPrice.toFixed(2)}`;
        }

        // Apply discount functionality
        document.getElementById('applyDiscount').addEventListener('click', function() {
            const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);

            if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
                alert("Please enter a valid discount percentage between 0 and 100.");
                return;
            }

            // Calculate discount amount
            discountAmount = (totalPrice * discountPercentage) / 100;

            // Update discount and final price in the summary section
            document.getElementById('summaryDiscount').textContent = `Discount: Rp ${discountAmount.toFixed(2)}`;

            const finalPrice = totalPrice - discountAmount - downPaymentAmount;
            document.getElementById('summaryFinalPrice').textContent = `Harga Akhir: Rp ${finalPrice.toFixed(2)}`;
        });

        // Apply Down Payment (DP) functionality
        document.getElementById('applyDP').addEventListener('click', function() {
            const dpValue = parseFloat(document.getElementById('downPayment').value);

            if (isNaN(dpValue) || dpValue < 0) {
                alert("Please enter a valid down payment amount.");
                return;
            }

            // Update down payment amount
            downPaymentAmount = dpValue;

            // Update DP and final price in the summary section
            document.getElementById('summaryDP').textContent = `Down Payment (DP): Rp ${downPaymentAmount.toFixed(2)}`;

            const finalPrice = totalPrice - discountAmount - downPaymentAmount;
            document.getElementById('summaryFinalPrice').textContent = `Harga Akhir: Rp ${finalPrice.toFixed(2)}`;
        });

    

        // Export TXT functionality
        document.getElementById('exportTXTButton').addEventListener('click', function() {
            // Get customer information
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            const transactionDate = document.getElementById('transactionDate').value;

            // Get product data from the main table
            const rows = document.querySelectorAll('#productTable tbody tr');
            const products = [];
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const productName = cells[0].innerText;
                const productPrice = cells[1].innerText;
                products.push(`${productName}: ${productPrice}`);
            });

            // Construct the TXT content
            let txtContent = `Nomor Invoice: ${invoiceNumber}\n`;
            txtContent += `Informasi Pelanggan:\n`;
            txtContent += `Nama: ${name}\n`;
            txtContent += `Alamat: ${address}\n`;
            txtContent += `Telepon: ${phone}\n`;
            txtContent += `Tanggal Transaksi: ${transactionDate}\n\n`;
            txtContent += `Daftar Produk:\n`;

            products.forEach((product, index) => {
                txtContent += `${index + 1}. ${product}\n`;
            });

            txtContent += `\nTotal Harga: Rp ${totalPrice.toFixed(2)}\n`;
            txtContent += `Discount: Rp ${discountAmount.toFixed(2)}\n`;
            txtContent += `Down Payment (DP): Rp ${downPaymentAmount.toFixed(2)}\n`;
            txtContent += `Harga Akhir: Rp ${(totalPrice - discountAmount - downPaymentAmount).toFixed(2)}\n\n`;
            txtContent += `Terimakasih sudah membeli produk kami\n`;

            // Create a Blob and download the TXT file
            const blob = new Blob([txtContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'your_transaction.txt';
            a.click();
            URL.revokeObjectURL(url);
        });

        // Send to WhatsApp functionality
        document.getElementById('sendToWhatsApp').addEventListener('click', function() {
            // Get customer information
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            const transactionDate = document.getElementById('transactionDate').value;

            // Get product data from the main table
            const tableData = [];
            const rows = document.querySelectorAll('#productTable tbody tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const rowData = {
                    productName: cells[0].innerText,
                    productPrice: cells[1].innerText
                };
                tableData.push(rowData);
            });

            // Construct the message
            let whatsappMessage = `Nomor Invoice: ${invoiceNumber}\n`;
            whatsappMessage += `*Informasi Pelanggan*:\nNama: ${name}\nAlamat: ${address}\nTelepon: ${phone}\nTanggal Transaksi: ${transactionDate}\n\n*Daftar Produk*:\n`;

            tableData.forEach((item, index) => {
                whatsappMessage += `Item ${index + 1}:\n`;
                whatsappMessage += `Produk: ${item.productName}\n`;
                whatsappMessage += `Harga: ${item.productPrice}\n\n`;
            });

            // Add total price, discount, down payment, and final price to the message
            const finalPrice = totalPrice - discountAmount - downPaymentAmount;
            whatsappMessage += `Total Harga: Rp ${totalPrice.toFixed(2)}\n`;
            whatsappMessage += `Discount: Rp ${discountAmount.toFixed(2)}\n`;
            whatsappMessage += `Down Payment (DP): Rp ${downPaymentAmount.toFixed(2)}\n`;
            whatsappMessage += `Harga Akhir: Rp ${finalPrice.toFixed(2)}\n\n`;
            whatsappMessage += `_Terimakasih sudah membeli produk kami_`;

            // Encode the message for WhatsApp URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

            // Open WhatsApp with the message
            window.open(whatsappURL, '_blank');
        });
