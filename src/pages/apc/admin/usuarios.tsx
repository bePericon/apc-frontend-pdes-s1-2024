import AuthPageWrapper from "@/components/layout/AuthPageWrapper";
import Header from "@/components/layout/Header/Header";
import Users from "@/components/layout/Users/Users";

export default function UsersPage() {
    return (
        <AuthPageWrapper>
            <Header />
            <Users />
        </AuthPageWrapper>
    )
}
