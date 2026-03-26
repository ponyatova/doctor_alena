import { ContactForm } from "@/components/ContactForm";
import { ClinicLocations } from "@/components/lending/ClinicLocations";
import { getDoctorById, getProblems } from "@/lib/db";
import { LuPhone, LuMail } from "react-icons/lu";
import { RevealSection } from "@/components/lending/RevealSection";
import Link from "next/link";

export default async function ContactsPage() {
  const [doctor, problems] = await Promise.all([
    getDoctorById(1).catch(() => null),
    getProblems().catch(() => []),
  ]);
  
  return (
    <main className="relative min-h-screen pt-[80px]">
      {/* Форма записи */}
      {doctor && <ContactForm problem={problems} doctor={doctor} />}

      {/* Карта с адресами */}
      {doctor?.addresses && doctor.addresses.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <ClinicLocations locations={doctor.addresses} />
          </div>
        </section>
      )}

      {/* Дополнительная информация (опционально) */}
    </main>
  );
}
