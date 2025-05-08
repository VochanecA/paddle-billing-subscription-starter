// 'use client';

// import { useState } from 'react';
// import { Calculator, Clock, DollarSign, Download, Mail, Send, PieChart } from 'lucide-react';

// export function ROICalculator() {
//   // Form state
//   const [formStep, setFormStep] = useState(1);
//   const [formData, setFormData] = useState({
//     companySize: '',
//     industry: '',
//     currentHours: '',
//     averageSalary: '',
//     email: '',
//     name: '',
//   });
//   const [showResults, setShowResults] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [downloadReady, setDownloadReady] = useState(false);

//   // Results calculation
//   const calculateResults = () => {
//     // Simple ROI calculation based on form inputs
//     const employeeCount = parseInt(formData.companySize) || 0;
//     const hoursPerWeek = parseInt(formData.currentHours) || 0;
//     const avgSalary = parseInt(formData.averageSalary) || 0;

//     // Calculate time saved (hours per week)
//     const timeSavedPercent = 0.3; // Assume 30% time savings
//     const weeklySavingsHours = hoursPerWeek * timeSavedPercent;
//     const annualSavingsHours = weeklySavingsHours * 52;

//     // Calculate money saved
//     const hourlyRate = avgSalary / (40 * 52); // Assuming 40h work week, 52 weeks
//     const weeklySavingsMoney = weeklySavingsHours * hourlyRate * employeeCount;
//     const annualSavingsMoney = weeklySavingsMoney * 52;

//     // Calculate productivity gain
//     const productivityGain = (weeklySavingsHours / hoursPerWeek) * 100;

//     // Cost calculation
//     const monthlyCostPerUser = 49; // Example SaaS monthly cost
//     const annualCost = monthlyCostPerUser * employeeCount * 12;

//     // ROI calculation
//     const annualROI = ((annualSavingsMoney - annualCost) / annualCost) * 100;

//     return {
//       weeklySavingsHours: weeklySavingsHours.toFixed(1),
//       annualSavingsHours: annualSavingsHours.toFixed(0),
//       weeklySavingsMoney: weeklySavingsMoney.toFixed(0),
//       annualSavingsMoney: annualSavingsMoney.toFixed(0),
//       productivityGain: productivityGain.toFixed(1),
//       annualCost: annualCost.toFixed(0),
//       annualROI: annualROI.toFixed(0),
//       breakEvenMonths: annualCost > 0 ? Math.ceil((annualCost / annualSavingsMoney) * 12) : 0,
//     };
//   };

//   // Form handlers
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formStep < 3) {
//       setFormStep(prevStep => prevStep + 1);
//     } else {
//       setIsSubmitting(true);
//       // Simulate form submission
//       setTimeout(() => {
//         setIsSubmitting(false);
//         setShowResults(true);
//         // In a real app, you would send the data to your backend here
//         console.log('Form submitted:', formData);
//       }, 1500);
//     }
//   };

//   const handleDownloadReport = () => {
//     setDownloadReady(true);
//     // Simulate report generation
//     setTimeout(() => {
//       // Create a downloadable report
//       const results = calculateResults();
//       const reportContent = `
//         Personalized ROI Report for ${formData.name}
//         =========================================

//         Company Information:
//         - Industry: ${formData.industry}
//         - Team Size: ${formData.companySize} employees

//         Current Situation:
//         - Hours spent weekly: ${formData.currentHours} hours
//         - Average salary: $${formData.averageSalary}

//         Projected Savings with Our Platform:
//         - Weekly time saved: ${results.weeklySavingsHours} hours
//         - Annual time saved: ${results.annualSavingsHours} hours
//         - Weekly cost savings: $${results.weeklySavingsMoney}
//         - Annual cost savings: $${results.annualSavingsMoney}

//         ROI Metrics:
//         - Productivity gain: ${results.productivityGain}%
//         - Annual ROI: ${results.annualROI}%
//         - Break-even period: ${results.breakEvenMonths} months

//         Thank you for using our ROI calculator!
//         `;

//       // Create download link
//       const blob = new Blob([reportContent], { type: 'text/plain' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `ROI-Report-${formData.name.replace(/\s+/g, '-')}.txt`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     }, 1000);
//   };

//   const results = calculateResults();

//   return (
//     <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
//             Calculate Your ROI
//           </span>
//         </h2>
//         <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
//           See how much time and money your team could save with our platform.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//         {/* Calculator Form */}
//         <div className={`lg:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 ${showResults ? 'lg:col-span-2' : 'lg:col-span-5'}`}>
//           <div className="flex items-center mb-6">
//             <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
//               <Calculator className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//             </span>
//             <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
//               ROI Calculator
//             </h3>
//           </div>

//           {/* Progress Steps */}
//           <div className="flex mb-8">
//             {[1, 2, 3].map((step) => (
//               <div key={step} className="flex-1 relative">
//                 <div
//                   className={`h-2 ${
//                     step <= formStep
//                       ? 'bg-gradient-to-r from-purple-500 to-pink-500'
//                       : 'bg-gray-200 dark:bg-gray-700'
//                   }`}
//                 ></div>
//                 <div className="absolute top-4 left-0 w-full text-center">
//                   <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
//                     {step === 1 ? 'Company Info' : step === 2 ? 'Time & Money' : 'Contact'}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit} className="mt-12">
//             {/* Step 1: Company Info */}
//             {formStep === 1 && (
//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     How many employees in your company?
//                   </label>
//                   <select
//                     id="companySize"
//                     name="companySize"
//                     value={formData.companySize}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
//                     required
//                   >
//                     <option value="">Select team size</option>
//                     <option value="1">Just me</option>
//                     <option value="5">2-5 employees</option>
//                     <option value="15">6-25 employees</option>
//                     <option value="50">26-100 employees</option>
//                     <option value="250">101-500 employees</option>
//                     <option value="1000">500+ employees</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     What industry are you in?
//                   </label>
//                   <select
//                     id="industry"
//                     name="industry"
//                     value={formData.industry}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
//                     required
//                   >
//                     <option value="">Select your industry</option>
//                     <option value="tech">Technology</option>
//                     <option value="finance">Finance</option>
//                     <option value="healthcare">Healthcare</option>
//                     <option value="education">Education</option>
//                     <option value="retail">Retail</option>
//                     <option value="manufacturing">Manufacturing</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Time & Money */}
//             {formStep === 2 && (
//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="currentHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     How many hours per week do you spend on tasks our platform could streamline?
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Clock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="number"
//                       id="currentHours"
//                       name="currentHours"
//                       min="1"
//                       max="100"
//                       value={formData.currentHours}
//                       onChange={handleInputChange}
//                       placeholder="Hours per week"
//                       className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="averageSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     What's the average annual salary of your team members? (USD)
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <DollarSign className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="number"
//                       id="averageSalary"
//                       name="averageSalary"
//                       min="10000"
//                       step="5000"
//                       value={formData.averageSalary}
//                       onChange={handleInputChange}
//                       placeholder="Average annual salary"
//                       className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Contact Info */}
//             {formStep === 3 && (
//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="your@email.com"
//                       className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   By submitting, you agree to receive your personalized ROI report via email. We'll also send you occasional product updates.
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-between mt-8">
//               {formStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => setFormStep(prev => prev - 1)}
//                   className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Back
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`ml-auto px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all ${
//                   isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   'Processing...'
//                 ) : formStep < 3 ? (
//                   'Continue'
//                 ) : (
//                   <span className="flex items-center">
//                     Calculate ROI <Send className="ml-2 h-4 w-4" />
//                   </span>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Results Panel */}
//         {showResults && (
//           <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center mb-6">
//               <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
//                 <PieChart className="h-6 w-6 text-green-600 dark:text-green-400" />
//               </span>
//               <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
//                 Your Personalized ROI Results
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
//                 <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Time Saved</h4>
//                 <div className="space-y-4">
//                   <div>
//                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                       {results.weeklySavingsHours} hrs
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">Weekly hours saved</div>
//                   </div>
//                   <div>
//                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                       {results.annualSavingsHours} hrs
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">Annual hours saved</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
//                 <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Money Saved</h4>
//                 <div className="space-y-4">
//                   <div>
//                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                       ${results.weeklySavingsMoney}
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">Weekly cost savings</div>
//                   </div>
//                   <div>
//                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                       ${results.annualSavingsMoney}
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">Annual cost savings</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-8">
//               <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
//                 <div className="text-xl font-semibold mb-1">Return on Investment</div>
//                 <div className="flex items-baseline">
//                   <span className="text-4xl font-bold">{results.annualROI}%</span>
//                   <span className="ml-2">Annual ROI</span>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Productivity Gain</div>
//                 <div className="text-2xl font-bold text-gray-900 dark:text-white">{results.productivityGain}%</div>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Annual Cost</div>
//                 <div className="text-2xl font-bold text-gray-900 dark:text-white">${results.annualCost}</div>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Break-Even</div>
//                 <div className="text-2xl font-bold text-gray-900 dark:text-white">{results.breakEvenMonths} months</div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <button
//                 onClick={handleDownloadReport}
//                 disabled={downloadReady}
//                 className={`w-full flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all ${
//                   downloadReady ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600'
//                 }`}
//               >
//                 {downloadReady ? (
//                   'Report Downloaded!'
//                 ) : (
//                   <>
//                     <Download className="h-5 w-5 mr-2" />
//                     Download Full Report
//                   </>
//                 )}
//               </button>

//               <div className="text-center text-sm text-gray-500 dark:text-gray-400">
//                 We've also sent this report to {formData.email}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

'use client';

import { useState } from 'react';
import {
  Calculator,
  Clock,
  DollarSign,
  Download,
  Mail,
  Send,
  PieChart,
  BarChart3,
  Users,
  TrendingUp,
} from 'lucide-react';

export function ROICalculator() {
  // Form state
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    companySize: '',
    industry: '',
    currentHours: '',
    averageSalary: '',
    email: '',
    name: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  // Results calculation
  const calculateResults = () => {
    // Simple ROI calculation based on form inputs
    const employeeCount = parseInt(formData.companySize) || 0;
    const hoursPerWeek = parseInt(formData.currentHours) || 0;
    const avgSalary = parseInt(formData.averageSalary) || 0;

    // Calculate time saved (hours per week)
    const timeSavedPercent = 0.3; // Assume 30% time savings
    const weeklySavingsHours = hoursPerWeek * timeSavedPercent;
    const annualSavingsHours = weeklySavingsHours * 52;

    // Calculate money saved
    const hourlyRate = avgSalary / (40 * 52); // Assuming 40h work week, 52 weeks
    const weeklySavingsMoney = weeklySavingsHours * hourlyRate * employeeCount;
    const annualSavingsMoney = weeklySavingsMoney * 52;

    // Calculate productivity gain
    const productivityGain = (weeklySavingsHours / hoursPerWeek) * 100;

    // Cost calculation
    const monthlyCostPerUser = 49; // Example SaaS monthly cost
    const annualCost = monthlyCostPerUser * employeeCount * 12;

    // ROI calculation
    const annualROI = ((annualSavingsMoney - annualCost) / annualCost) * 100;

    return {
      weeklySavingsHours: weeklySavingsHours.toFixed(1),
      annualSavingsHours: annualSavingsHours.toFixed(0),
      weeklySavingsMoney: weeklySavingsMoney.toFixed(0),
      annualSavingsMoney: annualSavingsMoney.toFixed(0),
      productivityGain: productivityGain.toFixed(1),
      annualCost: annualCost.toFixed(0),
      annualROI: annualROI.toFixed(0),
      breakEvenMonths: annualCost > 0 ? Math.ceil((annualCost / annualSavingsMoney) * 12) : 0,
    };
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep((prevStep) => prevStep + 1);
    } else {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setShowResults(true);
        // In a real app, you would send the data to your backend here
        console.log('Form submitted:', formData);
      }, 1500);
    }
  };

  const handleDownloadReport = () => {
    setDownloadReady(true);
    // Simulate report generation
    setTimeout(() => {
      // Create a downloadable report
      const results = calculateResults();
      const reportContent = `
        Personalized ROI Report for ${formData.name}
        =========================================
        
        Company Information:
        - Industry: ${formData.industry}
        - Team Size: ${formData.companySize} employees
        
        Current Situation:
        - Hours spent weekly: ${formData.currentHours} hours
        - Average salary: $${formData.averageSalary}
        
        Projected Savings with Our Platform:
        - Weekly time saved: ${results.weeklySavingsHours} hours
        - Annual time saved: ${results.annualSavingsHours} hours
        - Weekly cost savings: $${results.weeklySavingsMoney}
        - Annual cost savings: $${results.annualSavingsMoney}
        
        ROI Metrics:
        - Productivity gain: ${results.productivityGain}%
        - Annual ROI: ${results.annualROI}%
        - Break-even period: ${results.breakEvenMonths} months
        
        Thank you for using our ROI calculator!
        `;

      // Create download link
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ROI-Report-${formData.name.replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const results = calculateResults();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 opacity-80" />
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900 blur-3xl opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Quantify Your Savings
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Calculate Your ROI
            </span>
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300">
            See how much time and money your team could save with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Calculator Form */}
          <div
            className={`lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 ${showResults ? 'lg:col-span-2' : 'lg:col-span-5'}`}
          >
            <div className="flex items-center mb-6">
              <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </span>
              <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">ROI Calculator</h3>
            </div>

            {/* Progress Steps */}
            <div className="flex mb-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex-1 relative">
                  <div
                    className={`h-2 ${
                      step <= formStep
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    } ${step === 1 ? 'rounded-l-full' : ''} ${step === 3 ? 'rounded-r-full' : ''}`}
                  ></div>
                  <div className="absolute top-4 left-0 w-full text-center">
                    <span
                      className={`text-xs font-medium ${step <= formStep ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                      {step === 1 ? 'Company Info' : step === 2 ? 'Time & Money' : 'Contact'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-12">
              {/* Step 1: Company Info */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="companySize"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      How many employees in your company?
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                      required
                    >
                      <option value="">Select team size</option>
                      <option value="1">Just me</option>
                      <option value="5">2-5 employees</option>
                      <option value="15">6-25 employees</option>
                      <option value="50">26-100 employees</option>
                      <option value="250">101-500 employees</option>
                      <option value="1000">500+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      What industry are you in?
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                      required
                    >
                      <option value="">Select your industry</option>
                      <option value="tech">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Time & Money */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="currentHours"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      How many hours per week do you spend on tasks our platform could streamline?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        id="currentHours"
                        name="currentHours"
                        min="1"
                        max="100"
                        value={formData.currentHours}
                        onChange={handleInputChange}
                        placeholder="Hours per week"
                        className="w-full pl-10 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="averageSalary"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      What's the average annual salary of your team members? (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        id="averageSalary"
                        name="averageSalary"
                        min="10000"
                        step="5000"
                        value={formData.averageSalary}
                        onChange={handleInputChange}
                        placeholder="Average annual salary"
                        className="w-full pl-10 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full pl-10 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    By submitting, you agree to receive your personalized ROI report via email. We'll also send you
                    occasional product updates.
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {formStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setFormStep((prev) => prev - 1)}
                    className="px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`ml-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium shadow-md hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 transition-all duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : formStep < 3 ? (
                    'Continue'
                  ) : (
                    <span className="flex items-center">
                      Calculate ROI <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Results Panel */}
          {showResults && (
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-violet-600/10 dark:from-blue-400/5 dark:to-violet-400/5 rounded-bl-full" />

              <div className="flex items-center mb-8">
                <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </span>
                <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                  Your Personalized ROI Results
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-2">
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </span>
                    <h4 className="text-sm uppercase font-semibold text-slate-500 dark:text-slate-400">Time Saved</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        {results.weeklySavingsHours} <span className="text-lg">hrs</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Weekly hours saved</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        {results.annualSavingsHours} <span className="text-lg">hrs</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Annual hours saved</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <span className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mr-2">
                      <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </span>
                    <h4 className="text-sm uppercase font-semibold text-slate-500 dark:text-slate-400">Money Saved</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${results.weeklySavingsMoney}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Weekly cost savings</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${results.annualSavingsMoney}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Annual cost savings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="relative h-28 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500 rounded-xl p-6 text-white overflow-hidden">
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-8 border-white"></div>
                    <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full border-8 border-white"></div>
                  </div>

                  <div className="relative">
                    <div className="text-xl font-semibold mb-1">Return on Investment</div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{results.annualROI}%</span>
                      <span className="ml-2 text-sm">Annual ROI</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center">
                  <span className="p-1.5 bg-violet-100 dark:bg-violet-900/30 rounded-full mr-2">
                    <TrendingUp className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  </span>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Productivity</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">+{results.productivityGain}%</div>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center">
                  <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-2">
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </span>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Annual Cost</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">${results.annualCost}</div>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center">
                  <span className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mr-2">
                    <Calculator className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </span>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Break-Even</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{results.breakEvenMonths} mo</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleDownloadReport}
                  disabled={downloadReady}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500 text-white font-medium shadow-md hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 transition-all duration-300 ${
                    downloadReady ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {downloadReady ? (
                    'Report Downloaded!'
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Download Full Report
                    </>
                  )}
                </button>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                  We've also sent this report to {formData.email}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
