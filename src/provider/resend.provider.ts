import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ResendProvider {
    private resend: Resend;

    constructor(private configService: ConfigService) {
        this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
    }

    async sendEmail(params: {
        to: string;
        subject: string;
        html: string;
        from?: string;
    }) {
        const from = params.from || this.configService.get<string>('FROM_EMAIL');
        const { data, error } = await this.resend.emails.send({
            from: from as string,
            to: params.to,
            subject: params.subject,
            html: params.html,
        });

        if (error) {
            throw new Error(`Resend error: ${error.message}`);
        }

        return {
            messageId: data?.id,
            success: true,
        };
    }
}
