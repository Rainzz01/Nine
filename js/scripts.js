(function ($) {
    "use strict";

    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    });

    $(document).ready(function() {
        // Function to initialize Facebook SDK and show modal on button click
        $('#show-facebook-plugin').on('click', function() {
            // Initialize Facebook SDK if not already loaded
            if (typeof FB === 'undefined') {
                $.ajaxSetup({ cache: true });
                $.getScript('https://connect.facebook.net/zh_CN/sdk.js', function() {
                    FB.init({
                        xfbml: true,
                        version: 'v19.0'
                    });
                    showFacebookModal();
                });
            } else {
                showFacebookModal();
            }
        });

        // Function to show the Facebook modal
        function showFacebookModal() {
            $('#facebook-modal').modal('show');
        }
    });

    $(document).ready(function() {
        // Function to save the feedback to local storage
        function saveFeedback() {
            var feedback = $('#feedbackInput').val().trim();
            if (feedback === '') {
                alert('Please enter your feedback before saving!');
                return;
            }
            localStorage.setItem('feedback', feedback);
            alert('Feedback saved successfully!');
        }

        // Function to submit the feedback
        function submitFeedback() {
            alert('Thank you for your feedback!');
            $('#feedbackInput').val(''); // Clear the textarea after submitting
            localStorage.removeItem('feedback'); // Clear the saved feedback from local storage
        }

        // Load saved feedback from local storage
        function loadFeedback() {
            var savedFeedback = localStorage.getItem('feedback');
            if (savedFeedback) {
                $('#feedbackInput').val(savedFeedback);
            }
        }

        // Event listeners for save and submit buttons
        $('#saveFeedback').on('click', saveFeedback);
        $('#submitFeedback').on('click', submitFeedback);

        // Load saved feedback when the page is loaded
        $(document).ready(loadFeedback);
    });

})(jQuery);

