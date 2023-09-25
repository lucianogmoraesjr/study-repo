import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { StudentsService } from '../../services/students.service'
import { CoursesService } from '../../services/courses.service'
import { EnrollmentsService } from '../../services/enrollments.service'

export interface Custumer {
  authUserId: string
}

export interface Product {
  id: string
  title: string
  slug: string
}

export interface PurchaseCreatedPayload {
  custumer: Custumer
  product: Product
}

@Controller()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.custumer.authUserId,
    )

    if (!student) {
      student = await this.studentsService.create({
        authUserId: payload.custumer.authUserId,
      })
    }

    let course = await this.coursesService.getCourseBySlug(payload.product.slug)

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      })
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    })
  }
}
