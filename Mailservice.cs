using SendGrid.Helpers.Mail;
using SendGrid;
using System;
using System.Web;
trynpm install nodemailer
{
    // Retrieve form data from the HTTP POST request
    var formData = HttpContext.Current.Request.Form;
    var firstName = formData["firstname"];
    var lastName = formData["lastname"];
    var email = formData["email"];
    var messageSubject = formData["subject"];
    var messageBody = formData["Message"];

    // Your SendGrid API key
    var apiKey = Environment.GetEnvironmentVariable("tim");

    if (string.IsNullOrEmpty(apiKey))
    {
        Console.WriteLine("API Key is null or empty. Check your environment variable.");
        return;
    }

    var from = new EmailAddress("timpaaswebsite@gmail.com", "Tim");
    var subject = emailSubject;

    // Create email content using form data
    var emailMessage = $"Name: {firstName} {lastName}\nEmail: {email}\nSubject: {messageSubject}\nMessage: {messageBody}";

    var to = new EmailAddress("timpaaswebsite@gmail.com", "Tim");
    var plainTextContent = emailMessage;
    var htmlContent = emailMessage;

    // Send the email
    var client = new SendGridClient(apiKey);
    var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
    var response = await client.SendEmailAsync(msg);

    Console.WriteLine(response.StatusCode);
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred: {ex.Message}");
}
