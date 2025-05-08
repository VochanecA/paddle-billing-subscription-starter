import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto p-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-foreground mb-4">
            We respect your privacy and are committed to protecting your personal data in compliance with the General
            Data Protection Regulation (GDPR) (EU) 2016/679.
          </p>
          <p className="text-foreground">
            This privacy policy will inform you about how we look after your personal data when you visit our website
            and tell you about your privacy rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
          <p className="text-foreground mb-4">
            We may collect, use, store and transfer different kinds of personal data about you:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Identity Data:</strong> First name, last name, username or similar identifier
            </li>
            <li>
              <strong>Contact Data:</strong> Email address, telephone numbers
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in
              types, operating system
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our website
            </li>
            <li>
              <strong>Marketing Data:</strong> Your preferences in receiving marketing from us
            </li>
          </ul>
          <p className="text-foreground">
            We use cookies and similar tracking technologies to track activity on our website. You can set your browser
            to refuse all or some browser cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
          <p className="text-foreground mb-4">We will only use your personal data when the law allows us to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
          <p className="text-foreground">
            We will get your express opt-in consent before we share your personal data with any third party for
            marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-foreground">
            We have implemented appropriate security measures to prevent your personal data from being accidentally
            lost, used or accessed in an unauthorized way. We limit access to your personal data to those employees and
            other third parties who have a business need to know.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your Legal Rights</h2>
          <p className="text-foreground mb-4">Under GDPR, you have rights including:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Right to access</strong> - You have the right to request copies of your personal data
            </li>
            <li>
              <strong>Right to rectification</strong> - You have the right to request correction of inaccurate data
            </li>
            <li>
              <strong>Right to erasure</strong> - You have the right to request deletion of your personal data
            </li>
            <li>
              <strong>Right to restrict processing</strong> - You have the right to request restriction of processing
            </li>
            <li>
              <strong>Right to data portability</strong> - You have the right to request transfer of your data
            </li>
            <li>
              <strong>Right to object</strong> - You have the right to object to our processing of your data
            </li>
          </ul>
          <p className="text-foreground">
            To exercise any of these rights, please contact us at{' '}
            <Link href="mailto:privacy@yourdomain.com" className="text-primary">
              privacy@yourdomain.com
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
          <p className="text-foreground">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the Last updated date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-foreground mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-foreground">
            By email:{' '}
            <Link href="mailto:privacy@yourdomain.com" className="text-primary">
              privacy@yourdomain.com
            </Link>
          </p>
        </section>

        <div className="pt-8">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
