$(function() {
	jQuery.validator.addMethod(
		'validate-selection',
		function(value) {
			return value.length;
		},
		'Please select one option'
	);

	$('#survey-form').validate({
		rules: {
			name: { required: true },
			email: { required: true, email: true },
			age: { required: true },
			'current-role': { 'validate-selection': true },
			idea: { required: true }
		},
		messages: {
			name: { required: 'Please enter your name' },
			email: { required: 'Please enter your email', email: 'Please enter a valid email address' }
		},
		errorClass: 'validation-error',
		highlight: function(element) {
			$(element).addClass('is-invalid');
			$(element)
				.parent()
				.addClass('animated shake');
		},
		unhighlight: function(element) {
			$(element).removeClass('is-invalid');
			$(element)
				.parent()
				.removeClass('animated shake');
		}
	});

	$('#survey-form').submit(function(e) {
		var validationError = false;
		e.preventDefault();
		/* Radio input validation */
		if ($('input[name="how-do-you-hear"]:checked').length == 0) {
			if ($('#radio .validation-error').length > 0) {
				validationError = true;
			} else {
				$('#radio').append('<li class="validation-error animated shake">Please select one option<li>');
				validationError = true;
			}
		}

		/* Checkbox input validation */
		if ($('input[name="tech-stack-interest"]:checked').length == 0) {
			if ($('#selection .validation-error').length > 0) {
				validationError = true;
			} else {
				$('#selection').append('<li class="validation-error animated shake">Please select at least one option<li>');
				validationError = true;
			}
		}

		if (!$('#survey-form').valid() || validationError) {
			return;
		}

		alert('Form submitted!');
	});
	$("input[name='how-do-you-hear']").change(function() {
		if ($('input[name="how-do-you-hear"]:checked').length > 0) {
			$('#radio .validation-error').remove();
		}
	});
	$("input[name='tech-stack-interest']").change(function() {
		if ($('input[name="tech-stack-interest"]:checked').length > 0) {
			$('#selection .validation-error').remove();
		} else {
			$('#selection').append('<li class="validation-error animated shake">Please select at least one option<li>');
		}
	});
});
