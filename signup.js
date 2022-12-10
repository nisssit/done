<script>
  $(function () {
    $(".form_photo").hide();
    $("#photo").on("click", function (e) {
      $(".form_photo").show();
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $(".form_photo").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#photo").change(function () {
      readURL(this);
    });

    $("#view").hide();

    var inputQuantity = [];
    $(function () {
      $(".quantity").each(function (i) {
        inputQuantity[i] = this.defaultValue;
        $(this).data("idx", i);
      });
      $(".quantity").on("keyup", function (e) {
        var $field = $(this),
          val = this.value,
          $thisIndex = parseInt($field.data("idx"), 10);

        if (val.length > Number($field.attr("maxlength"))) {
          val = val.slice(0, 5);
          $field.val(val);
        }
        inputQuantity[$thisIndex] = val;
      });
    });

    $("form[name='registration']").validate({
      rules: {
        name: {
          required: true,
          lettersonly: true,
          minlength: 3,
        },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 8,
          pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9]{8,}$/,
        },
        hobbies: {
          required: true,
        },
        number: {
          required: true,
          pattern: "[1-9]{1}[0-9]{9}",
        },
        photo: {
          required: true,
        },
      },
      messages: {
        name: "Please enter your name",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 8 characters long",
          pattern:
            "your password must contain upper- and lower-case characters and at least one number ",
        },
        email: "Please enter a valid email address",
        hobbies: "Please select any hobbie",
        number: "Please enter a valid Number",
        photo: "plese select photo",
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") == "hobbies") {
          error.appendTo("#errorToShow");
        } else {
          error.insertAfter(element);
        }
      },

      submitHandler: function (form, e) {
        e.preventDefault();

        if (jQuery("button").data("clicked")) {
          $("#registration").show();
        } else {
          $("#registration").hide();
          $("#view").show();
        }
        $("#form_name").html($("#name").val());
        $("#form_email").html($("#email").val());
        $("#form_password").html($("#password").val());
        $("#form_number").html($("#number").val());

        var hobbies = "";
        var searchIDs = $("input:checkbox:checked")
          .map(function () {
            return $(this).data("date");
          })
          .toArray();

        $("#form_hobbies").html(searchIDs + "<br/>");
      },
    });
  });
</script>
