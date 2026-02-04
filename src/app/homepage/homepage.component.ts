import { Component, signal } from "@angular/core";
import { ViewerComponent } from "../../components/viewer/viewer.component";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ComponentDialogComponent } from "../../components/component-dialog/component-dialog.component";
import { ThemeSwitcherComponent } from "../../components/theme-switcher/theme-switcher.component";
import { DialogComponent } from "../../components/dialog/dialog.component";
import { WritableSignal } from "@angular/core";
import { TwoFactorAuthComponent } from "../two-factor-auth/two-factor-auth.component";
@Component({
    selector: "app-home-page",
    imports: [CommonModule, ViewerComponent, DialogModule, ComponentDialogComponent, DialogComponent, ThemeSwitcherComponent, TwoFactorAuthComponent],
    templateUrl: "./homepage.component.html",
    styleUrl: "./homepage.component.scss",
})
export class HomePageComponent {
    currentPage = signal<string>('projects');
    campoVisible = signal<boolean>(true);

    // component dialog (new)
    dialogVisibleComponent = signal<boolean>(false);
    selectedImageComponent = '';
    selectedDescriptionComponent = '';
    selectedMainDescriptionComponent = '';
    // theme dialog (projects uses this for Theme Switcher)
    dialogVisibleTheme = signal<boolean>(false);
    // two-factor auth dialog
    dialogVisibleTwoFactorAuth = signal<boolean>(false);

    // old dialog
    dialogVisibleOld = signal<boolean>(false);
    selectedImageOld = '';
    selectedDescriptionOld = '';
    selectedMainDescriptionOld = '';
    changePage(page: string): void {
        this.currentPage.set(page);
    }

    changeVisible(signal: WritableSignal<boolean>): void {
        signal.update(value => !value);
    }

    openComponentDialog(image: string, description: string): void {
        this.selectedImageComponent = image;
        this.selectedDescriptionComponent = description;
        this.dialogVisibleComponent.set(true);
    }

    openThemeDialog(): void {
        this.selectedDescriptionComponent = 'Theme Switcher that I built using Angular and PrimeNG components. It allows users to toggle between light and dark themes seamlessly aswell as looking cool.';
        this.dialogVisibleTheme.set(true);
    }

    openTwoFactorDialog(): void {
        this.selectedDescriptionComponent = '2FA Component built with Angular. This component allows copy and paste aswell as making sure all inputs are numbers, while providing some flowy animations.';
        this.dialogVisibleTwoFactorAuth.set(true);
    }

    openOldDialog(image: string, description: string, mainDescription: string): void {
        this.selectedImageOld = image;
        this.selectedDescriptionOld = description;
        this.selectedMainDescriptionOld = mainDescription;
        this.dialogVisibleOld.set(true);
    }
}