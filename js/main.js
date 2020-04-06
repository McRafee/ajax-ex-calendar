$(document).ready(function() {
    // Handlebars
    var dayHTML = $('#calendar-template').html();
    var dayTemplate = Handlebars.compile(dayHTML);

    var initialDate = moment('2018-01-01');
    printDaysOfMonth(initialDate); // Calendar initialization
    printHolidays(initialDate);

    // Click to print the following month
    $('.next').click(function() {
        initialDate.add(1, 'month');
        if (initialDate.year() != "2018") {
            initialDate.year("2018");
        }
        printDaysOfMonth(initialDate);
        printHolidays(initialDate);
    });

    // Click to print the previous month
    $('.prev').click(function() {
        initialDate.subtract(1, 'month');
        if (initialDate.year() != "2018") {
            initialDate.year("2018");
        }
        printDaysOfMonth(initialDate);
        printHolidays(initialDate);
    });


    function printDaysOfMonth(monthToPrint) {
        $('.days').empty();
        var standardDay = monthToPrint.clone();
        var daysOfMonth = monthToPrint.daysInMonth();
        var nameOfMonth = monthToPrint.format('MMMM');
        $('#month').text(nameOfMonth); // Update the name of month on top
        for (var i = 1; i <= daysOfMonth; i++) {
            // $('#calendar').append('<li>' + i + ' ' + nameOfMonth + '</li>');
            var dayToPrint = {
                day: i + ' ' + nameOfMonth,
                dataDay: standardDay.format('YYYY-MM-DD')
            }
            var finalTemplate = dayTemplate(dayToPrint); // Populate the template with the object data
            $('#calendar .days').append(finalTemplate);
            standardDay.add(1, 'day');
        }
    }

    function printHolidays(date) {
        var month = date.month();
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: month
            },
            success: function(data) {
                var holidays = data.response;
                for (var i = 0; i < holidays.length; i++) {
                    var holiday = holidays[i];
                    var nameOfHoliday = holiday.name;
                    var dateOfHoliday = holiday.date;
                    $('.day-number[data-day="' + dateOfHoliday + '"]').addClass('holiday').append(' - ' + nameOfHoliday);
                }
            }
        });
    }

});
