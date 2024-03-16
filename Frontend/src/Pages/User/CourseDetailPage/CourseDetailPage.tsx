import Navbar from '../../../Components/User/Navbar/Navbar';
import CourseHeader from '../../../Components/User/CourseDetail/CourseHeader';
import BuyNow from '../../../Components/User/CourseDetail/BuyNow';
import Footer from '../../../Components/User/Footer/Footer';
import CourseCards from '../../../Components/User/CourseDetail/CourseCards';

function CourseDetailPage() {
    return (
        <div>
            <Navbar />
            <CourseHeader />
            <CourseCards />
            <BuyNow />
            <Footer />

        </div>
    )
}

export default CourseDetailPage
