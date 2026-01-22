import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, CheckCircle } from "lucide-react";
import FileUpload from "@/components/FileUpload";

const LeaderRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    address: "",
    curr_pos: "",
    constituency: "",
    electing_for: "",
    party: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    aadhaar_card: null,
    voter_id: null,
    party_ticket: null,
    affidavit: null,
    education_certificates: null,
    social_work: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (fieldName) => (file) => {
    setUploadedFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const submissionData = new FormData();

        // append text fields
        Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value);
        });

        // append files (only if selected)
        Object.entries(uploadedFiles).forEach(([key, file]) => {
        if (file) {
            submissionData.append("documents", file); 
            // backend expects: upload.array("documents")
        }
        });
        console.log(formData);
        const res = await fetch("http://localhost:3000/leader-auth/verification", {
        method: "POST",
        body: submissionData,
        credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
        }

        alert("Leader verification submitted successfully ✅");
        console.log("Response:", data);
    } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong");
        }
    };


  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container max-w-4xl mx-auto px-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <Shield />
            </div>
            <div>
              <h1 className="font-bold text-lg">VoterAware</h1>
              <p className="text-xs opacity-80">Leader Verification Portal</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-card rounded-xl shadow border">
          <div className="bg-muted/50 border-b px-6 py-5">
            <h2 className="text-xl font-semibold">Leader Registration Form</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Please fill in the details below to verify your identity and candidature.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Personal */}
            <section>
              <h3 className="font-semibold mb-4">Personal Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="input" required />
                <input type="email" name="mail" value={formData.email} onChange={handleInputChange} placeholder="Email ID" className="input" required />
                <textarea name="address" value={formData.currentAddress} onChange={handleInputChange} placeholder="Current Address" className="input sm:col-span-2" rows={3} required />
              </div>
            </section>

            {/* Political */}
            <section>
              <h3 className="font-semibold mb-4">Political Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="curr_pos" value={formData.currentPosition} onChange={handleInputChange} placeholder="Current Position" className="input" required />
                <input name="constituency" value={formData.constituencyElectingFor} onChange={handleInputChange} placeholder="Constituency Electing For" className="input" required />
                <select name="electing_for" value={formData.electingFor} onChange={handleInputChange} className="input" required>
                  <option value="">Electing For</option>
                  <option value="MLA">MLA</option>
                  <option value="MP">MP</option>
                  <option value="Rajya Sabha">Rajya Sabha</option>
                  <option value="Municipal">Municipal</option>
                </select>
                <input name="party_name" value={formData.partyName} onChange={handleInputChange} placeholder="Party Name" className="input" required />
              </div>
            </section>

            {/* Documents */}
            <section>
              <h3 className="font-semibold mb-4">Documents</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FileUpload label="Aadhaar Card" accept="image/*,.pdf" acceptLabel="Image or PDF" onFileSelect={handleFileSelect("aadhaarCard")} />
                <FileUpload label="Voter ID Card" accept="image/*,.pdf" acceptLabel="Image or PDF" onFileSelect={handleFileSelect("voterIdCard")} />
                <FileUpload label="Party Ticket" accept="image/*,.pdf" acceptLabel="Image or PDF" onFileSelect={handleFileSelect("partyTicket")} />
                <FileUpload label="Affidavit" accept=".pdf" acceptLabel="PDF only" onFileSelect={handleFileSelect("affidavit")} />
                <FileUpload label="Education Certificates" accept=".pdf" acceptLabel="PDF only" onFileSelect={handleFileSelect("educationCertificates")} />
                <FileUpload label="Social Work Proof" accept=".pdf" acceptLabel="PDF only" onFileSelect={handleFileSelect("socialWorkProof")} />
              </div>
            </section>

            <button type="submit" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg flex items-center gap-2">
              <CheckCircle />
              Submit for Verification
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LeaderRegistration;