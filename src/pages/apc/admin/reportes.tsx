import AuthPageWrapper from "@/components/layout/AuthPageWrapper";
import Header from "@/components/layout/Header/Header";
import Reports from "@/components/layout/Reports/Reports";

export default function UsersPage() {
    return (
        <AuthPageWrapper>
            <Header />
            <Reports />
        </AuthPageWrapper>
    )
}
