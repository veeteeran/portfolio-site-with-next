// src/components/ContactSection.tsx (with improved placeholder text contrast)
"use client";
import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SocialLinks } from "./SocialLinks";

type FormStatus = "idle" | "submitting" | "success" | "error";

const HONEYPOT_FIELD = "website";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const honeypotValue = formData.get(HONEYPOT_FIELD) as string;
      if (honeypotValue) {
        console.log("Honeypot triggered - likely a bot");
        setTimeout(() => {
          setFormStatus("success");
          form.reset();
        }, 1000);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        throw new Error(responseData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-primary text-primary-foreground dark:bg-secondary dark:border-t dark:border-accent-foreground/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-xl max-w-2xl mx-auto dark:text-white">
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Form Card */}
          <Card className="bg-white text-foreground dark:bg-background/90 dark:text-white">
            <CardHeader>
              <CardTitle className="dark:text-white">Send a Message</CardTitle>
              <CardDescription className="dark:text-primary-foreground/80">
                Fill out the form and I&apos;ll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2 dark:text-white">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground dark:text-primary-foreground/80">
                    Thank you for reaching out. I&apos;ll respond as soon as
                    possible.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 dark:border-primary-foreground/30 dark:text-white"
                    onClick={() => setFormStatus("idle")}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        required
                        className="bg-muted/50 dark:bg-background/80 dark:text-white dark:placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="bg-muted/50 dark:bg-background/80 dark:text-white dark:placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <Input
                        name="subject"
                        placeholder="Subject"
                        required
                        className="bg-muted/50 dark:bg-background/80 dark:text-white dark:placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        required
                        className="min-h-32 bg-muted/50 dark:bg-background/80 dark:text-white dark:placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  {formStatus === "error" && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm dark:bg-red-900/30 dark:text-red-300">
                      {errorMessage || "An error occurred. Please try again."}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full dark:bg-accent dark:text-white dark:hover:bg-accent/80"
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Connect Options Card */}
          <Card className="bg-white text-foreground dark:bg-background/90 dark:text-white">
            <CardHeader>
              <CardTitle className="dark:text-white">Connect With Me</CardTitle>
              <CardDescription className="dark:text-primary-foreground/80">
                Professional software engineer with experience in modern web
                technologies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SocialLinks />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground dark:text-primary-foreground/70">
              <p>Based in Tulsa, OK • Available for remote work</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
