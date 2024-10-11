
function validateContactForm(event) {
    event.preventDefault();

    var email = document.getElementById('email').value.trim();
    var comment = document.getElementById('comment').value.trim();
    var emailError = document.getElementById('emailError');
    var commentError = document.getElementById('commentError');

    // Clear previous error messages
    emailError.textContent = '';
    commentError.textContent = '';

    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Invalid email address. Must be in the format example@domain.com.';
        return;
    }

    // Comment validation
    if (comment.length === 0) {
        commentError.textContent = 'Comment cannot be empty.';
        return;
    }

    if (comment.length > 50) {
        comment = comment.substring(0, 50);
        document.getElementById('comment').value = comment;
        commentError.textContent = 'Comment was trimmed to 50 characters.';
    }

    // Display the entered values in an alert


    alert('The information you have entered are:\n\n👉Email: ' + email + '\n👉Comment: ' + comment);
    
}

        // Exercise 2: Membership Calculator
        function calculateMembership(event) {
            event.preventDefault();

            const type = document.getElementById('type').value;
            const years = parseInt(document.getElementById('years').value, 10);
            const costField = document.getElementById('cost');
            const discountMessage = document.getElementById('discountMessage');

            let costPerYear = 0;

            switch (type) {
                case 'basic':
                    costPerYear = 10;
                    break;
                case 'premium':
                    costPerYear = 15;
                    break;
                case 'gold':
                    costPerYear = 20;
                    break;
                case 'platinum':
                    costPerYear = 25;
                    break;
            }

            let totalCost = costPerYear * years;
            let discount = 0;

            if (years >= 5) {
                discount = 0.20;
                totalCost -= 5;
                discountMessage.textContent = 'Congratulations!🎉You got  a 20% discount!😊 and  extra $5 discount!🥳';
            } else if (years > 2 && years < 5) {
                discount = 0.20;
                discountMessage.textContent = '🎉Congratulations!🎉You got a 20% discount!😊';
            } else {
                discountMessage.textContent = '';
            }

            totalCost -= totalCost * discount;
            costField.value = `$${totalCost.toFixed(2)}`;
        }

        // Exercise 3: Book Order Calculation
        function calculate() {
    // Get values from form inputs and convert appropriately
    const quantity = parseInt(document.getElementById('quantity').value, 10); // Convert to integer
    const price = parseFloat(document.getElementById('price').value); // Convert to float
    const tax = parseFloat(document.getElementById('tax').value); // Convert to float
    const discount = parseFloat(document.getElementById('discount').value); // Convert to float
    const shipping = parseFloat(document.getElementById('shipping').value); // Convert to float

    // Calculate total cost before tax and discount
    let totalCost = quantity * price;

    // Double the discount if quantity is greater than 100
    let effectiveDiscount = discount;
    if (quantity > 100) {
        effectiveDiscount *= 2; // Double the discount
    }

    // Calculate discount amount
    const discountAmount = totalCost * (effectiveDiscount / 100);

    // Calculate taxable amount (total cost - discount amount)
    const taxableAmount = totalCost - discountAmount;

    // Initialize tax amount
    let taxAmount = 0;

    // Calculate tax amount only if VAT is greater than 0
    if (tax > 0) {
        taxAmount = taxableAmount * (tax / 100);
    }

    // Calculate final total including shipping
    const finalTotal = taxableAmount + taxAmount + shipping;

    // Display the total in the total input field
    document.getElementById('total').value = finalTotal.toFixed(2);
}


        // Exercise 4: Toggle Additional Fields
    
        function toggleContactInput() {
            const contactMethod = document.getElementById('contactMethod').value;
            const smsInput = document.getElementById('smsInput');
            const emailInput = document.getElementById('emailInput');
            const phoneCallInput = document.getElementById('phoneCallInput');
            const otherInput = document.getElementById('otherInput');

            // Hide all input fields
            smsInput.style.display = 'none';
            emailInput.style.display = 'none';
            phoneCallInput.style.display = 'none';
            otherInput.style.display = 'none';

            // Clear previous input values
            document.getElementById('phoneNumber').value = '';
            document.getElementById('emailAddress').value = '';
            document.getElementById('phoneCallNumber').value = '';
            document.getElementById('otherContact').value = '';

            // Hide submit button initially
            document.getElementById('submitButton').style.display = 'none';

            // Show the relevant input field based on selection
            if (contactMethod === 'sms') {
                smsInput.style.display = 'block';
            } else if (contactMethod === 'email') {
                emailInput.style.display = 'block';
            } else if (contactMethod === 'phoneCall') {
                phoneCallInput.style.display = 'block';
            } else if (contactMethod === 'other') {
                otherInput.style.display = 'block';
            }

            checkInputs();
        }

        function validatePhoneNumber() {
            const phoneNumber = document.getElementById('phoneNumber').value;
            const phoneCallNumber = document.getElementById('phoneCallNumber').value;
            const phoneError = document.getElementById('phoneError');
            const phoneCallError = document.getElementById('phoneCallError');

            // Check SMS phone number
            if (phoneNumber && phoneNumber.length < 10) {
                phoneError.style.display = 'block';
            } else {
                phoneError.style.display = 'none';
            }

            // Check Phone Call phone number
            if (phoneCallNumber && phoneCallNumber.length < 10) {
                phoneCallError.style.display = 'block';
            } else {
                phoneCallError.style.display = 'none';
            }

            checkInputs(); // Check if inputs are valid to show submit button
        }

        function validateEmail() {
            const emailAddress = document.getElementById('emailAddress').value;
            const emailError = document.getElementById('emailError');

            // Simple regex pattern to validate email address format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate email format
            if (emailAddress && !emailPattern.test(emailAddress)) {
                emailError.style.display = 'block';
            } else {
                emailError.style.display = 'none';
            }

            checkInputs(); // Check if inputs are valid to show submit button
        }

        function checkInputs() {
            const contactMethod = document.getElementById('contactMethod').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const phoneCallNumber = document.getElementById('phoneCallNumber').value;
            const emailAddress = document.getElementById('emailAddress').value;
            const otherContact = document.getElementById('otherContact').value;
            const submitButton = document.getElementById('submitButton');

            let allInputsValid = false;

            // Check inputs based on selected contact method
            if (contactMethod === 'sms' && phoneNumber.length >= 10) {
                allInputsValid = true;
            } else if (contactMethod === 'phoneCall' && phoneCallNumber.length >= 10) {
                allInputsValid = true;
            } else if (contactMethod === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailPattern.test(emailAddress)) {
                    allInputsValid = true;
                }
            } else if (contactMethod === 'other' && otherContact.length > 0) {
                allInputsValid = true;
            }

            // Show or hide the submit button based on input validity
            if (allInputsValid) {
                submitButton.style.display = 'block';
            } else {
                submitButton.style.display = 'none';
            }
        }

        function validateForm() {
            const contactMethod = document.getElementById('contactMethod').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const phoneCallNumber = document.getElementById('phoneCallNumber').value;
            const emailAddress = document.getElementById('emailAddress').value;

            // Validate SMS Phone Number
            if (contactMethod === 'sms' && phoneNumber.length < 10) {
                alert('Phone number for SMS must be at least 10 digits.');
                return false;
            }

            // Validate Phone Call Number
            if (contactMethod === 'phoneCall' && phoneCallNumber.length < 10) {
                alert('Phone number for Phone Call must be at least 10 digits.');
                return false;
            }

            // Validate Email Address
            if (contactMethod === 'email' && !emailAddress) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailAddress)) {
                    alert('Please enter a valid email address.');
                    return false;
                }
                // Alert for email success
                alert('You passed the challenge 🎉!');
                return true; // Allow the form to be submitted
            }

            // Fun alert for other methods for testing
            alert('Interesting choice! Thank you for your time😊.');
            return true; // Allow the form to be submitted
        }
        


        //  Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');

    mobileMenu.addEventListener('click', () => {
        menu.classList.toggle('active'); // Toggle the active class
    });

